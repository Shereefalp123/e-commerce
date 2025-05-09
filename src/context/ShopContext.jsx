import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]); // state to store the fetched products
  const navigate = useNavigate();

  // Fetch products from db.json
  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setProducts(data.watches)) // Set the fetched products from db.json
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = async (item_id) => {
    let cartData = structuredClone(cartItems);
    if (cartData[item_id]) {
      cartData[item_id] += 1;
    } else {
      cartData[item_id] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        totalCount += cartItems[itemId];
      }
    }
    return totalCount;
  };

  const updateQuatity = async (item_id, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[item_id] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        const itemInfo = products.find((product) => product.id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }
    return totalAmount;
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
    addToCart,
    getCartCount,
    updateQuatity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
