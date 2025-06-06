import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Only update the latestProducts when products have been fetched
    if (products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]); // This effect will re-run when products change

  if (latestProducts.length === 0) {
    return (
      <div className='my-10 text-center'>
        <p>Loading latest collection...</p>
      </div>
    );
  }

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque odio eaque, consectetur accusantium quae quasi nisi ipsam, eveniet inventore, sequi dolorum aliquid sint nemo cumque facere asperiores nesciunt eligendi? Minima?
        </p>
      </div>
      {/* Render the products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item, index) => (
          <ProductItem key={index} id={item.id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
