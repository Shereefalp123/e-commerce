import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom'; 

function Cart() {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const navigate = useNavigate(); 
  const [cartData, setCartData] = useState([]);


  //  {-------------------------setting new cart data with updates -----------------------------------------------------}

  useEffect(() => {
    const tempData = Object.keys(cartItems)
      .filter(itemId => cartItems[itemId] > 0)  
      .map(itemId => ({
        id: itemId,
        quantity: cartItems[itemId],
      }));

    setCartData(tempData);


    //----------------------------------------saving to local storage-----------------------------------------------------------

    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);  


  const handleUpdateQuantity = (itemId, quantity) => {
    updateQuantity(itemId, quantity);  // Update quantity in the context
  };

  if (cartData.length === 0) {
    return (
      <div className="pt-14 text-center">
        <p>Your cart is empty!</p>
        <button 
          onClick={() => navigate('/shop')} 
          className="mt-4 bg-black text-white text-sm px-8 py-3"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product.id === item.id);

          if (!productData) {
            return (
              <div key={index} className="py-4 border-t border-b text-gray-700">
                <p>Product not found (ID: {item.id})</p>
              </div>
            );
          }

          return (

            // {-------------------------------displaying products------------------------------------------------------------}
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productData.image[0]} alt={productData.name} />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency}{productData.price}</p>
                  </div>
                </div>
              </div>

              {/* {--------------------------------updating qty------------------------------------------------------} */}

              <input
                onChange={(e) => {
                  const newQuantity = Number(e.target.value);
                  if (newQuantity > 0 && !isNaN(newQuantity)) {
                    handleUpdateQuantity(item.id, newQuantity);
                  }
                }}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                value={item.quantity}
              />

               {/* {------===================-----------------remooving item--------------------------------------------} */}
              <img
                onClick={() => handleUpdateQuantity(item.id, 0)}  
                className="w-4 mr-5 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Remove Item"
                title="Remove Item"
                aria-label="Remove Item"
              />
            </div>
          );
        })}
      </div>

      {/*======================================= Checkout======================================================== */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate('/place-order')}  
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
