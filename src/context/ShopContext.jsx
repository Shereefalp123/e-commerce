import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();
    

  // {/* --------------------------------fetch products -----------------------------------------*/}

  useEffect(() => {
    axios.get('http://localhost:3000/watches')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);
//  {---------------------------------------------user and cart---------------------------}
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      const savedCart = JSON.parse(localStorage.getItem(`cart_${savedUser.id}`));
      setCartItems(savedCart || {});
    }
    setIsLoading(false); 
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
    }
  }, [user, cartItems]);

  const updateCartInStorageAndBackend = async (newCart) => {
    setCartItems(newCart);
    if (user?.id) {
      try {
        await axios.patch(`http://localhost:3000/users/${user.id}`, { cart: newCart });
      } catch (err) {
        console.error("Error saving cart:", err);
      }
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
    }
  };

  const addToCart = async (item_id) => {
    if (!user) return navigate('/login');
    const newCart = { ...cartItems, [item_id]: (cartItems[item_id] || 0) + 1 };
    await updateCartInStorageAndBackend(newCart);
  };

  const updateQuantity = async (item_id, quantity) => {
    const newCart = { ...cartItems };
    if (quantity === 0) {
      delete newCart[item_id];
    } else {
      newCart[item_id] = quantity;
    }
    await updateCartInStorageAndBackend(newCart);
  };

  const clearCart = async () => {
    const newCart = {};
    await updateCartInStorageAndBackend(newCart);
  };

  const clearCartAfterOrder = async () => {
    const newCart = {};
    await updateCartInStorageAndBackend(newCart);
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  };

  const getCartAmount = () => {
    const amount = Object.entries(cartItems).reduce((total, [itemId, qty]) => {
      const product = products.find(p => p.id == itemId);
      return product ? total + product.price * qty : total;
    }, 0);
    return amount + delivery_fee;
  };

  const logout = () => {
    if (user?.id) {
      localStorage.removeItem(`cart_${user.id}`);
    }
    setUser(null);
    setCartItems({});
    localStorage.removeItem("user");
    navigate("/login");
  };

  const addOrder = (newOrder) => {
    if (user?.id) {
      const userOrdersKey = `orders_${user.id}`;
      try {
        const existingOrders = JSON.parse(localStorage.getItem(userOrdersKey)) || [];
        existingOrders.push(newOrder);
        localStorage.setItem(userOrdersKey, JSON.stringify(existingOrders));
      } catch (error) {
        console.error("Error saving order:", error);
      }
    }
  };

  const updateCartAfterOrder = async () => {
    if (user?.id) {
      try {
        setCartItems({});
        await axios.patch(`http://localhost:3000/users/${user.id}`, { cart: {} });
        localStorage.setItem(`cart_${user.id}`, JSON.stringify({}));
      } catch (err) {
        console.error('Error clearing cart after order:', err);
      }
    }
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    logout,
    user,
    setUser,
    clearCartAfterOrder,
    addOrder,
    updateCartAfterOrder,
    isLoading, 
    clearCart,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
