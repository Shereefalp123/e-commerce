import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: [''],
    bestseller: false,
    category: '',
    subCategory: '',
  });

// {---------------------------------------fetch---------------------------------------------------------------------------------}
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:3000/watches')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  };


  // {--------------------------------edit or update----------------------------------------------------}

  const handleEdit = (product) => {
    setEditId(product.id);
    setEditedProduct({ ...product });
  };

  const handleCancel = () => {
    setEditId(null);
    setEditedProduct({});
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdate = () => {
    axios.patch(`http://localhost:3000/watches/${editId}`, editedProduct)
      .then(() => {
        fetchProducts();
        handleCancel();
      })
      .catch(err => console.error('Error updating product:', err));
  };

  // {-----------------------------------------------add new-----------------------------------------------------------}

  const handleNewChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNewImageChange = (e) => {
    setNewProduct(prev => ({
      ...prev,
      image: [e.target.value],
    }));
  };

  const handleAddProduct = () => {
    const newProductData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      date: Date.now(),
    };

    axios.post('http://localhost:3000/watches', newProductData)
      .then(() => {
        fetchProducts();
        setNewProduct({
          name: '',
          description: '',
          price: '',
          image: [''],
          bestseller: false,
          category: '',
          subCategory: '',
        });
      })
      .catch(err => console.error('Error adding product:', err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`http://localhost:3000/watches/${id}`)
        .then(() => fetchProducts())
        .catch(err => console.error('Error deleting product:', err));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <table className="w-full border mb-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Bestseller</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Subcategory</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        {/* {----------------------------------------edit or update-------------------------------------} */}
        
        <tbody>
          {products.map((watch, index) => (
            <tr key={watch.id} className="text-center">
              <td className="border px-2 py-1">{index +1}</td>        
              <td className="border px-2 py-1">
                {editId === watch.id ? (
                  <input
                    type="text"
                    name="image"
                    value={editedProduct.image?.[0] || ''}
                    onChange={(e) =>
                      setEditedProduct((prev) => ({
                        ...prev,
                        image: [e.target.value],
                      }))
                    }
                    className="w-32 border px-1"
                  />
                ) : (
                  <img
                    src={watch.image?.[0]}
                    alt={watch.name}
                    className="w-16 h-16 object-contain mx-auto"
                  />
                )}
              </td>
              <td className="border px-2 py-1">
                {editId === watch.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleEditChange}
                    className="w-full border px-1"
                  />
                ) : (
                  watch.name
                )}
              </td>
              <td className="border px-2 py-1">
                {editId === watch.id ? (
                  <textarea
                    name="description"
                    value={editedProduct.description}
                    onChange={handleEditChange}
                    className="w-full border px-1"
                  />
                ) : (
                  watch.description
                )}
              </td>
              <td className="border px-2 py-1">
                {editId === watch.id ? (
                  <input
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleEditChange}
                    className="w-20 border px-1"
                  />
                ) : (
                  `$${watch.price}`
                )}
              </td>
              <td className="border px-2 py-1">
                {editId === watch.id ? (
                  <input
                    type="checkbox"
                    name="bestseller"
                    checked={editedProduct.bestseller}
                    onChange={handleEditChange}
                  />
                ) : watch.bestseller ? (
                  'Yes'
                ) : (
                  'No'
                )}
              </td>
              <td className="border px-2 py-1">
                {editId === watch.id ? (
                  <input
                    type="text"
                    name="category"
                    value={editedProduct.category || ''}
                    onChange={handleEditChange}
                    className="w-full border px-1"
                  />
                ) : (
                  watch.category || '-'
                )}
              </td>
              <td className="border px-2 py-1">
                {editId === watch.id ? (
                  <input
                    type="text"
                    name="subCategory"
                    value={editedProduct.subCategory || ''}
                    onChange={handleEditChange}
                    className="w-full border px-1"
                  />
                ) : (
                  watch.subCategory || '-'
                )}
              </td>
              <td className="border px-2 py-1">
                {editId === watch.id ? (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(watch)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(watch.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {------------------------------add new product--------------------------------------------------------------------} */}

      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image[0]}
          onChange={handleNewImageChange}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newProduct.name}
          onChange={handleNewChange}
          className="border p-2"
        />
        <textarea
          placeholder="Description"
          name="description"
          value={newProduct.description}
          onChange={handleNewChange}
          className="border p-2 col-span-2"
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={newProduct.price}
          onChange={handleNewChange}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={newProduct.category}
          onChange={handleNewChange}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Subcategory"
          name="subCategory"
          value={newProduct.subCategory}
          onChange={handleNewChange}
          className="border p-2"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="bestseller"
            checked={newProduct.bestseller}
            onChange={handleNewChange}
          />
          Bestseller
        </label>
        <button
          onClick={handleAddProduct}
          className="bg-green-500 text-white px-4 py-2 rounded col-span-2"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AdminProducts;
