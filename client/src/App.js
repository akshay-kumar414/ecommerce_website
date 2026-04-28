import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MyOrders from "./MyOrders";
import AdminOrders from "./AdminOrders";

const CATEGORIES = [
  { id:"all", name:"All", emoji:"🛒" },
  { id:"dairy", name:"Dairy & Bread", emoji:"🥛" },
  { id:"fruits", name:"Fruits", emoji:"🍎" },
  { id:"vegetables", name:"Vegetables", emoji:"🥬" },
  { id:"rice", name:"Rice & Atta", emoji:"🍚" },
  { id:"beverages", name:"Beverages", emoji:"🥤" },
  { id:"snacks", name:"Snacks", emoji:"🍪" },
  { id:"masala", name:"Masala & Spices", emoji:"🌶️" },
  { id:"oil", name:"Oil & Ghee", emoji:"🫒" },
  { id:"personal", name:"Personal Care", emoji:"🧴" },
  { id:"household", name:"Household", emoji:"🏠" },
  { id:"instant", name:"Instant Food", emoji:"🍜" },
];

const CAT_KEYWORDS = {
  dairy:["milk","butter","cheese","curd","paneer","ghee","cream","yogurt","bread","egg"],
  fruits:["apple","banana","mango","orange","grape","fruit","papaya","watermelon","berry","pomegranate"],
  vegetables:["potato","tomato","onion","vegetable","carrot","spinach","cabbage","cauliflower","capsicum","peas","brinjal","lady"],
  rice:["rice","atta","wheat","flour","grain","dal","lentil","pulses","maida","sooji","besan"],
  beverages:["juice","water","soda","tea","coffee","drink","cola","beverage","shake","lassi"],
  snacks:["chips","biscuit","cookie","snack","namkeen","chocolate","candy","wafer","rusk"],
  masala:["masala","spice","turmeric","chili","pepper","cumin","coriander","garam","salt","jeera"],
  oil:["oil","ghee","sunflower","mustard","olive","coconut oil","refined"],
  personal:["soap","shampoo","toothpaste","body wash","cream","lotion","deodorant","face wash","conditioner"],
  household:["detergent","cleaner","mop","tissue","broom","freshener","dishwash","wipe"],
  instant:["noodles","maggi","pasta","instant","ready to eat","soup","oats","poha","upma"],
};

const BANNERS = [
  { id:1, title:"Fresh Vegetables", sub:"Up to 40% Off", bg:"linear-gradient(135deg,#e8f5e1,#c8e6c9)", color:"#0C831F", emoji:"🥬🥕🍅" },
  { id:2, title:"Dairy Essentials", sub:"Starting at ₹25", bg:"linear-gradient(135deg,#fff8e1,#ffecb3)", color:"#d97706", emoji:"🥛🧈🧀" },
  { id:3, title:"Weekend Specials", sub:"Buy 2 Get 1 Free", bg:"linear-gradient(135deg,#fce4ec,#f8bbd0)", color:"#c2185b", emoji:"🎉✨🎊" },
];

function App() {
  const [products,setProducts] = useState([]);
  const [cartItems,setCartItems] = useState([]);
  const [cartCount,setCartCount] = useState(0);
  const [totalPrice,setTotalPrice] = useState(0);
  const [search,setSearch] = useState("");
  const [loading,setLoading] = useState(true);
  const [toast,setToast] = useState(null);
  const [addingId,setAddingId] = useState(null);
  const [addedIds,setAddedIds] = useState([]);
  const [showCart,setShowCart] = useState(false);
  const [activeCategory,setActiveCategory] = useState("all");
  const [activeBanner,setActiveBanner] = useState(0);

  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YWJlYzJmMTk2MGU5MWQ0MjE0NTc1NyIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3NzM1NTA0NSwiZXhwIjoxNzc3NDQxNDQ1fQ.z41Xa653hL6sKM5jmU5UCyvsKs7RM5UPk0R0F62vxbw"; // apna token

  // ✅ FETCH PRODUCTS
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch(err) {
      console.log("Products error:", err);
    }
    setLoading(false);
  };

  // FETCH CART
  const fetchCart = async () => {
    try{
      const res = await axios.get(
        "http://localhost:5000/api/cart",
        { headers:{ Authorization:`Bearer ${token}` } }
      );
      if(res.data && res.data.items){
        setCartItems(res.data.items);
        let qty = 0, total = 0;
        res.data.items.forEach(item => {
          qty += item.quantity;
          total += item.quantity * (item.product?.price || 0);
        });
        setCartCount(qty);
        setTotalPrice(total);
      }
    }catch(err){
      console.log("Cart error (ignore if not logged in)");
    }
  };

  // ADD TO CART
  const addToCart = async (id) => {
    setAddingId(id);
    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        { productId:id, quantity:1 },
        { headers:{ Authorization:`Bearer ${token}` } }
      );
      fetchCart();
      setAddedIds(prev => [...prev, id]);
      setTimeout(() => setAddedIds(prev => prev.filter(x => x !== id)), 1500);
      showToast("success", "Added!", "Item added to your cart");
    } catch(err) {
      showToast("error", "Oops!", "Could not add item. Try again.");
    }
    setAddingId(null);
  };

  // CHECKOUT
  const checkout = async () => {
    if(cartItems.length === 0) {
      showToast("error", "Cart Empty", "Add items before checkout.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        {},
        { headers:{ Authorization:`Bearer ${token}` } }
      );
      showToast("success", "Order Placed! 🎉", "Your order is on its way.");
      setShowCart(false);
      fetchCart();
    } catch(err) {
      showToast("error", "Failed", "Something went wrong. Try again.");
    }
  };

  // TOAST
  const showToast = (type, title, message) => {
    setToast({type, title, message});
  };

  useEffect(()=>{
    fetchProducts();
    fetchCart();
  },[]);

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner(prev => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if(toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // ROUTES
  if(window.location.pathname === "/orders") return <MyOrders />;
  if(window.location.pathname === "/admin") return <AdminOrders />;

  // FILTER by search + category
  const filteredProducts = (products || []).filter(product => {
    const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
    if(activeCategory === "all") return matchSearch;
    const keywords = CAT_KEYWORDS[activeCategory] || [];
    const text = (product.name + " " + (product.description || "")).toLowerCase();
    const matchCat = keywords.some(kw => text.includes(kw));
    return matchSearch && matchCat;
  });

  // Skeleton cards for loading
  const SkeletonCards = () => (
    <div className="skeleton-grid">
      {[...Array(8)].map((_,i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-img" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
          <div className="skeleton-line price" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="app-wrapper">

      {/* TOAST */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          <span className="toast-icon">{toast.type === "success" ? "✅" : "⚠️"}</span>
          <div className="toast-body">
            <h4>{toast.title}</h4>
            <p>{toast.message}</p>
          </div>
          <span className="toast-close" onClick={() => setToast(null)}>✕</span>
          <div className="toast-progress" />
        </div>
      )}

      {/* DELIVERY BANNER */}
      <div className="delivery-banner" id="delivery-banner">
        <span>⚡ Delivery in 10 minutes</span>
        <span className="loc">📍 Delivering to your area</span>
      </div>

      {/* NAVBAR */}
      <nav className="navbar" id="main-navbar">
        <h2 className="logo">Local<span>Kart</span></h2>

        <div className="search-box">
          <input
            id="search-input"
            type="text"
            placeholder="Search for atta, dal, rice, milk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="nav-actions">
          <button className="nav-btn" id="nav-orders-btn" onClick={() => window.location.href="/orders"}>
            📄 My Orders
          </button>
          <button className="nav-btn" id="nav-admin-btn" onClick={() => window.location.href="/admin"}>
            ⚙️ Admin
          </button>
          <button className="cart-btn" id="cart-badge" onClick={() => setShowCart(true)}>
            🛒 Cart <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </nav>

      {/* CATEGORY STRIP */}
      <div className="category-strip" id="category-strip">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`cat-pill ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="cat-emoji">{cat.emoji}</span>
            <span className="cat-name">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* BANNERS */}
      <div className="banner-section">
        <div className="banner-track">
          {BANNERS.map((b, i) => (
            <div
              key={b.id}
              className="banner-card"
              style={{
                background: b.bg,
                color: b.color,
                display: i === activeBanner ? "flex" : "none"
              }}
            >
              <div>
                <h3>{b.title}</h3>
                <p>{b.sub}</p>
                <span className="shop-link" onClick={() => document.getElementById('products-section')?.scrollIntoView({behavior:"smooth"})}>
                  Shop Now →
                </span>
              </div>
              <span className="banner-emoji">{b.emoji}</span>
            </div>
          ))}
        </div>
        <div className="banner-dots">
          {BANNERS.map((_, i) => (
            <span key={i} className={i === activeBanner ? "active" : ""} onClick={() => setActiveBanner(i)} />
          ))}
        </div>
      </div>

      {/* SECTION HEADER */}
      <div className="section-header" id="products-section">
        <h2>
          {search
            ? `Results for "${search}"`
            : activeCategory === "all"
              ? "All Products"
              : CATEGORIES.find(c => c.id === activeCategory)?.name
          }
        </h2>
        <span className="product-count">{filteredProducts.length} items</span>
      </div>

      {/* PRODUCTS GRID */}
      <div className="products-grid">
        {loading && <SkeletonCards />}

        {!loading && filteredProducts.length === 0 && (
          <div className="empty-state">
            <p>😕 No products found {search ? `for "${search}"` : "in this category"}</p>
          </div>
        )}

        {!loading && filteredProducts.map(product => (
          <div key={product._id} className="product-card" id={`product-${product._id}`}>
            <span className="delivery-tag">⚡ 10 min</span>
            <img
              className="card-img"
              src={product.image || "https://via.placeholder.com/300x200?text=No+Image"}
              alt={product.name}
              loading="lazy"
            />
            <div className="card-body">
              <h3 className="card-name">{product.name}</h3>
              <p className="card-desc">{product.description}</p>
              <div className="card-footer">
                <span className="card-price">₹{product.price}</span>
                <button
                  id={`add-btn-${product._id}`}
                  className={`add-btn ${addingId === product._id ? "adding" : ""} ${addedIds.includes(product._id) ? "added" : ""}`}
                  onClick={() => addToCart(product._id)}
                  disabled={addingId === product._id}
                >
                  {addingId === product._id ? "..." : addedIds.includes(product._id) ? "✓ Added" : "ADD"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FLOATING CART BAR */}
      {cartCount > 0 && !showCart && (
        <div className="floating-cart" id="floating-cart" onClick={() => setShowCart(true)}>
          <div className="fc-info">
            <span className="fc-count">{cartCount} item{cartCount > 1 ? "s" : ""}</span>
            <span className="fc-dot" />
            <span className="fc-total">₹{totalPrice}</span>
          </div>
          <div className="fc-action">
            View Cart →
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {showCart && (
        <>
          <div className="cart-overlay" onClick={() => setShowCart(false)} />
          <div className="cart-drawer" id="cart-drawer">
            <div className="drawer-header">
              <h3>🛒 Your Cart</h3>
              <button className="drawer-close" onClick={() => setShowCart(false)}>✕</button>
            </div>

            <div className="drawer-items">
              {cartItems.length === 0 ? (
                <div className="drawer-empty">
                  <div className="empty-icon">🛒</div>
                  <p>Your cart is empty</p>
                  <button className="shop-btn" onClick={() => setShowCart(false)}>Start Shopping</button>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item._id} className="d-item" id={`cart-item-${item._id}`}>
                    <div className="d-item-info">
                      <div className="d-item-name">{item.product?.name || "Product Deleted"}</div>
                      <div className="d-item-price">₹{item.product?.price || 0}</div>
                    </div>
                    <span className="d-item-qty">×{item.quantity}</span>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="drawer-footer">
                <div className="bill-row">
                  <span>Item Total</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="bill-row">
                  <span>Delivery Fee</span>
                  <span style={{color:"var(--primary-500)",fontWeight:600}}>FREE</span>
                </div>
                <div className="bill-row total-row">
                  <span>To Pay</span>
                  <span>₹{totalPrice}</span>
                </div>
                <button className="checkout-btn" id="checkout-btn" onClick={checkout}>
                  Place Order • ₹{totalPrice}
                </button>
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
}

export default App;