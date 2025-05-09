import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { name, email, password };

    try {
      const response = await axios.post('http://localhost:5000/users', newUser);

      if (response.status === 201) {
        setMessage('User registered successfully!');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setMessage('Failed to register user. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <form
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700"
        onSubmit={handleSubmit}
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">Sign up</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password?</p>
        </div>
        <button className="bg-black text-white font-light px-8 py-2 mt-4">
          Sign Up
        </button>

        {message && <p className="text-center text-sm mt-4">{message}</p>}
      </form>
    </div>
  );
}

export default Register;
