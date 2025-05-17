import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { currency, user } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orders?userId=${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const userOrders = await response.json();
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError('There was an error loading your orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return <p className="text-center mt-10">Loading your orders...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">Please log in to view your orders.</p>;
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {orders.length === 0 ? (
        <p className="text-center mt-10">No orders placed yet.</p>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={index} className="border-t border-b py-6">
              <p className="mb-4 text-gray-500 text-sm">Date: {order.date}</p>
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm sm:text-base mb-4">
                  <div className="flex items-start gap-4">
                    <img className="w-16 sm:w-20" src={item.image} alt={item.name} />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="mt-1">Quantity: {item.quantity}</p>
                      <p className="mt-1">{currency}{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-green-600 text-xs sm:text-sm">{order.status}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
