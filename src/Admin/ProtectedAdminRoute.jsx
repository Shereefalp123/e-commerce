import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "./AdminContext";
import ClipLoader from "react-spinners/ClipLoader";

const ProtectedAdminRoute = ({ children }) => {
  const { isAdminLoggedIn, isLoading } = useContext(AdminContext);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#4CAF50"} />
      </div>
    );
  }

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedAdminRoute;
