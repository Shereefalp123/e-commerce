import React, { useState, useContext } from "react";
import { AdminContext } from "./AdminContext";

const AdminLogin = () => {
  const { loginAdmin } = useContext(AdminContext); 
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    loginAdmin(username, password); 
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
       {/* ------------------------------------ Input for the admin username ----------------------------------------------- */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          required
        />
        
        {/* ------------------------------------Input for the admin password ------------------------------------------*/}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        
        {/* Submit button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
