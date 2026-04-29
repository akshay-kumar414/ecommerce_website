
import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5001";

function MyOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YWJlYzJmMTk2MGU5MWQ0MjE0NTc1NyIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3NzM1NTA0NSwiZXhwIjoxNzc3NDQxNDQ1fQ.z41Xa653hL6sKM5jmU5UCyvsKs7RM5UPk0R0F62vxbw"; // apna token rakh

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/orders/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  return (

    <div className="orders-page">

      <div className="page-topbar">
        <button className="back-btn" onClick={() => window.location.href = "/"}>
          ← Back
        </button>
        <h1>📄 My Orders</h1>
      </div>

      <div className="orders-list">

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p style={{ color: "var(--neutral-400)" }}>Loading orders...</p>
          </div>
        )}

        {!loading && orders.length === 0 && (
          <h3 className="no-orders">No orders yet — go grab some groceries! 🛒</h3>
        )}

        {!loading && orders.map(order => (

          <div key={order._id} className="order-card" id={`order-${order._id}`}>

            {/* HEADER */}
            <div className="order-header">
              <span>Order</span>
              <span className="order-id">#{order._id.slice(-6)}</span>
            </div>

            {/* ITEMS */}
            {order.orderItems.map(item => (

              <div key={item._id} className="order-item">

                <div>
                  <p className="item-name">
                    {item.product?.name || "Product Deleted"}
                  </p>

                  <p className="item-qty">Qty: {item.quantity}</p>
                </div>

                <p className="item-price">
                  ₹{item.product?.price || item.price || 0}
                </p>

              </div>

            ))}

            {/* FOOTER */}
            <div className="order-footer">

              <p><b>Total:</b> ₹{order.totalPrice}</p>

              <span className={`status ${order.status === "Delivered" ? "green" :
                  order.status === "Pending" ? "yellow" :
                    "red"
                }`}>
                {order.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default MyOrders;
