import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShopContext } from './context/ShopContext';
import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard'; 
import ProtectedAdminRoute from './Admin/ProtectedAdminRoute';  // Importing protected admin route
import { AdminContext } from "./Admin/AdminContext";
import AdminProducts from './Admin/AdminProducts';
import Adminusers from './Admin/Adminusers';
import AdminOrders from './Admin/AdminOrders';

function App() {
  const { user, isLoading } = useContext(ShopContext);

  const ProtectedRoute = ({ children }) => {
    if (isLoading) return <div className="py-10 text-center text-lg">Loading...</div>;
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />

      <Routes>
        {/* User Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Admin Routes */}
        <Route path='/admin/login' element={<AdminLogin />} />
        
        {/* Admin protected routes */}
        <Route
          path='/admin'
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route path='/admin/products' element=
        {<ProtectedAdminRoute>
          <AdminProducts/>
          </ProtectedAdminRoute>}/>

          <Route path='/admin/users' element=
        {<ProtectedAdminRoute>
          <Adminusers/>
          </ProtectedAdminRoute>}/>
          
          <Route path='/admin/orders' element=
        {<ProtectedAdminRoute>
          <AdminOrders/>
          </ProtectedAdminRoute>}/> 

        {/* User Protected Routes */}
        <Route path='/place-order' element={
          <ProtectedRoute>
            <PlaceOrder />
          </ProtectedRoute>
        } />
        <Route path='/orders' element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
