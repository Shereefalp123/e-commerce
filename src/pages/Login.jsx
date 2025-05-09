import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios'; // Axios for making API requests

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(email,password)
    try {
      const response = await axios.get('http://localhost:5000/users')
      if (response.status !== 200) {
        alert ('coundl something')
        return
      }
      const users = response.data
      if (users.length <= 0){
        alert ("no users found")
        return
      }
      const user = users?.find((u)=>u.email ===email)
      if (!user){
        alert ('user not found')
        return
      } 
      const isPass = user.password === password
      console.log(user,password,isPass)
      if(!isPass){
        alert("incorrect password")
        return
      }
      navigate('/')
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'
      >
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>Login</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
        <input
          type="email"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot your password?</p>
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
