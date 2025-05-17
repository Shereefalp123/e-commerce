import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  //  {========================================navigate to home==================================================================}

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) navigate('/');
  }, [navigate]);

  //================================================handle submit===================================================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
     
    //=====================checking email and pass=====================

    if (!email || !password) {
      setError('Please fill out both fields.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/users?email=${email}`);
      const user = res.data.find((u) => u.email.toLowerCase() === email.toLowerCase());
      


      if (!user) {
        setError('User not found');
        setIsLoading(false);
        return;
      }

      //========================== check for blocked or deleted user ==========================

      if (user.isDeleted) {
        setError('This account has been deleted.');
        setIsLoading(false);
        return;
      }

      if (user.isBlocked) {
        setError('This account has been blocked. Please contact support.');
        setIsLoading(false);
        return;
      }

      //========================== check password match ==========================

      if (user.password !== password) {
        setError('Incorrect password');
        setIsLoading(false);
        return;
      }

      //=================setting user and cart to local storage==============================

      const cartResponse = await axios.get(`http://localhost:3000/users/${user.id}`);
      const cart = cartResponse.data.cart || {};

      setUser(user);
      setCartItems(cart);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));

      //=============================navigate==================================================

      navigate('/');

    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-20 flex justify-center">
      <form onSubmit={handleSubmit} className="w-[90%] sm:max-w-96 flex flex-col gap-4 text-gray-700">
        <h2 className="text-3xl mb-2">Login</h2>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <input
          type="email"
          autoComplete="email"
          className="px-3 py-2 border border-gray-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />

        <input
          type="password"
          autoComplete="current-password"
          className="px-3 py-2 border border-gray-800"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <button type="submit" className="bg-black text-white py-2" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>

        {isLoading && <div>Loading...</div>}
      </form>
    </div>
  );
}

export default Login;
