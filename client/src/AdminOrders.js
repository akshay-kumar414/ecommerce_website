
import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {

const [orders,setOrders] = useState([]);
const [loading,setLoading] = useState(true);

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YWU5Zjk5ODVmOTg2NTQwMjM4ZWM2ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NzM1NDk3NCwiZXhwIjoxNzc3NDQxMzc0fQ.oI2jCutcz3JBQRD-OYlUR1qhD08ZFGpUiuPibGba2E0";

const fetchOrders = async () => {
  setLoading(true);
  try{
    const res = await axios.get(
      "http://localhost:5000/api/orders/all",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    setOrders(res.data);

  }catch(error){
    console.log(error);
  }
  setLoading(false);
};

useEffect(()=>{
  fetchOrders();
},[]);


return(

<div className="admin-page">

  <div className="page-topbar">
    <button className="back-btn" onClick={()=>window.location.href="/"}>
      ← Back
    </button>
    <h1>📦 Admin Dashboard</h1>
  </div>

  {loading && (
    <div className="loading-container">
      <div className="spinner"></div>
      <p style={{color:"var(--neutral-400)"}}>Loading orders...</p>
    </div>
  )}

  {!loading && orders.length === 0 && <p style={{textAlign:"center",color:"var(--neutral-400)",padding:"40px"}}>No orders found</p>}

  <div className="admin-grid">

    {!loading && orders.map(order=>(

      <div key={order._id} className="admin-card" id={`admin-order-${order._id}`}>

        <h3>Order ID</h3>
        <p className="order-id">{order._id}</p>

        {/* ITEMS */}
        {(order.orderItems || order.items || []).map((item,index)=>(

          <div key={index} className="admin-item">

            <p>
              <b>{item.product?.name || "Product Deleted"}</b>
            </p>

            <p>Qty: {item.quantity}</p>

            <p>₹{item.product?.price || item.price || 0}</p>

          </div>

        ))}

        <h4>₹{order.totalPrice || order.totalAmount || 0}</h4>

        <p className="status green">
          {order.status || order.orderStatus || "Pending"}
        </p>

      </div>

    ))}

  </div>

</div>

);

}

export default AdminOrders;