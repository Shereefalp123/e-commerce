import React, { useEffect, useState} from "react";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminOrders = () => {
 
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchOrdersAndUsers = async () => {
      try {
        const [ordersRes, usersRes] = await Promise.all([
          axios.get("http://localhost:3000/orders"),
          axios.get("http://localhost:3000/users"),
        ]);
        setOrders(ordersRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to fetch data.");
      }
    };

    fetchOrdersAndUsers();
  }, []);

  const getUserInfo = (userId) => users.find((user) => user.id === userId) || {};

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150";
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);

      const updatedOrder = updatedOrders.find((order) => order.id === orderId);
      await axios.put(`http://localhost:3000/orders/${orderId}`, updatedOrder);

      toast.success(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => {
            const user = getUserInfo(order.userId);
            const total = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div key={order.id} className="border p-4 mb-4 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-2">Order ID: {order.id}</h2>
                <p>
                  <strong>User:</strong> {user.name} ({user.email})
                </p>
                <p><strong>Date:</strong> {order.date}</p>

                <label className="block my-2">
                  <strong>Status:</strong>
                 <select
                   value={order.status}
                   onChange={(e) => handleStatusChange(order.id, e.target.value)}
                   className="ml-2 border rounded px-2 py-1"
                 >
                 <option>Pending</option>
                 <option>Ready to ship</option>
                 <option>Shipped</option>
                 <option>Delivered</option>
                 <option>Cancelled</option>
                </select>

                </label>

                <p><strong>Payment:</strong> {order.paymentMethod}</p>
                <p><strong>Delivery Info:</strong></p>
                {typeof order.deliveryInfo === "object" ? (
                  <ul className="ml-4 list-disc">
                    <li>{order.deliveryInfo.name}</li>
                    <li>{order.deliveryInfo.address}</li>
                    <li>
                      {order.deliveryInfo.city}, {order.deliveryInfo.state}
                    </li>
                    <li>
                      {order.deliveryInfo.zipCode}, {order.deliveryInfo.country}
                    </li>
                    <li>Phone: {order.deliveryInfo.phone}</li>
                  </ul>
                ) : (
                  <p className="ml-4">{order.deliveryInfo}</p>
                )}

                <p className="mt-2 font-medium">Items:</p>
                <ul className="ml-4 list-disc">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex items-center my-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={handleImageError}
                        className="w-16 h-16 mr-4 object-cover rounded"
                      />
                      <span>
                        {item.name} (₹{item.price} × {item.quantity})
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 font-bold">Total: ₹{total}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
