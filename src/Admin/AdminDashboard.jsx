import React, { useContext } from "react";
import { AdminContext } from "./AdminContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { adminUsername, logoutAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logoutAdmin();
    }
  };

  
  if (!adminUsername) {
    navigate("/admin/login");
    return null;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f4", borderRadius: "8px" }}>
      <h2>Welcome, {adminUsername}</h2>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/admin/products")}
          style={{ marginBottom: "10px", padding: "10px", fontSize: "16px" }}
        >
          Manage Products
        </button>
        <br />
        <button
          onClick={() => navigate("/admin/users")}
          style={{ marginBottom: "10px", padding: "10px", fontSize: "16px" }}
        >
          Manage Users
        </button>
        <br />
        <button
          onClick={() => navigate("/admin/orders")}  
          style={{ marginBottom: "10px", padding: "10px", fontSize: "16px" }}
        >
          View Orders
        </button>
        <br />
        <button
          onClick={handleLogout}
          style={{ marginTop: "20px", padding: "10px", fontSize: "16px", backgroundColor: "#ff4d4d", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
