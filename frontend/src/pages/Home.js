import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../utils';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]); // products state
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));

    // fetch products when user logs in
    fetchProducts();
  }, []);

  // logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged Out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  // fetch products from API
  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>

      {/* Products Section */}
      <h2 style={{ marginTop: "20px" }}>Available Products</h2>
      <ul>
        {products && products.length > 0 ? (
          products.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong> — ₹{item.price}
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default Home;
