import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const navigate = useNavigate();

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(null); 
  const [adminUsername, setAdminUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true); 

  const loginAdmin = (username, password) => {
    if (username === "shereef" && password === "admin123") {
      setIsAdminLoggedIn(true);
      setAdminUsername(username);
      localStorage.setItem("isAdminLoggedIn", "true");
      localStorage.setItem("adminUsername", username);
      toast.success("successfully logged in...");
      navigate("/admin");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setAdminUsername("");
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminUsername");
    toast.info("Logged out successfully!");
    navigate("/admin/login");
  };

  useEffect(() => {
    const savedStatus = localStorage.getItem("isAdminLoggedIn");
    const savedUsername = localStorage.getItem("adminUsername");

    if (savedStatus === "true") {
      setIsAdminLoggedIn(true);
      setAdminUsername(savedUsername);
    } else {
      setIsAdminLoggedIn(false);
    }

    setIsLoading(false); // ← done loading from localStorage
  }, []);

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        adminUsername,
        loginAdmin,
        logoutAdmin,
        isLoading, // ← expose loading status
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
