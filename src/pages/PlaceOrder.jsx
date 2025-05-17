import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const { cartItems, products, user, currency, clearCartAfterOrder } = useContext(ShopContext);
  const [deliveryInfo, setDeliveryInfo] = useState('');
  const [method, setMethod] = useState('Cash on Delivery');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');

    // ✅ NEW: Check if deliveryInfo is empty
    if (!deliveryInfo.trim()) {
      setError('Delivery information is required.');
      setLoading(false);
      return;
    }

    // ============ Fetching cart items for order ============
    const orderItems = Object.entries(cartItems)
      .filter(([id, qty]) => qty > 0)
      .map(([id, qty]) => {
        const product = products.find((p) => p.id === id);
        return {
          id,
          name: product?.name,
          image: product?.image[0],
          price: product?.price,
          quantity: qty,
        };
      });

    if (orderItems.length === 0) {
      setError('Your cart is empty!');
      setLoading(false);
      return;
    }

    const newOrder = {
      userId: user.id,
      items: orderItems,
      deliveryInfo,
      paymentMethod: method,
      date: new Date().toLocaleDateString(),
      status: 'Ready to ship',
    };

    try {
      const response = await axios.post('http://localhost:3000/orders', newOrder, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 201) {
        throw new Error('Failed to place the order');
      }

      await clearCartAfterOrder();
      navigate('/orders');
    } catch (error) {
      setError('There was an error placing your order. Please try again.');
      console.error('Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="place-order p-4 sm:p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl mb-5 font-semibold">Place Your Order</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Delivery Information:</label>
        <textarea
          value={deliveryInfo}
          onChange={(e) => setDeliveryInfo(e.target.value)}
          placeholder="Enter your delivery address"
          className="w-full border border-gray-300 p-2 rounded"
          rows={4}
          required // ✅ optional — but doesn't trigger unless inside a <form>
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Payment Method:</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Credit Card">Credit Card</option>
        </select>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <ul>
          {Object.entries(cartItems)
            .filter(([id, qty]) => qty > 0)
            .map(([id, qty]) => {
              const product = products.find((p) => p.id === id);
              return (
                <li key={id} className="flex justify-between py-2 border-b">
                  <span>{product?.name}</span>
                  <span>
                    {currency}
                    {product?.price} x {qty}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="flex justify-between mb-4 font-medium">
        <span>Total:</span>
        <span>
          {currency}
          {Object.entries(cartItems)
            .reduce((total, [id, qty]) => {
              const product = products.find((p) => p.id === id);
              return product ? total + product.price * qty : total;
            }, 0)
            .toFixed(2)}
        </span>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="text-right">
        <button
          onClick={handlePlaceOrder}
          className="bg-black text-white py-2 px-8 rounded hover:bg-gray-900 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
