import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import HeroSection from './HeroSection';
import Footer from './Footer';
import './List.css';
import Banner from './Banner';


const ProductList = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product/listproduct');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrorMessage('Error fetching products. Please try again later.');
    }
  };

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.categoryname.toLowerCase() === category.toLowerCase());
      setFilteredProducts(filtered);
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await axios.post('http://localhost:8080/cart/add', {
        productid: product.id,
        quantity: 1 
      });
      console.log('Product added to cart:', response.data);
            navigate('/cart-summary', { state: { product } });
  
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setErrorMessage('Error adding product to cart. Please try again later.');
    }
  };

  return (
    <div>
      <NavBar />
      {/* <HeroSection /> */}
      <div className="container">
        
        <h3 className="marquee-text">Discover a wide range of products for all your needs</h3>
        {/* <img src={process.env.PUBLIC_URL + '/images/hero-banner.png'} alt="Hero Banner" /> */}
        {/* <Banner /> */}

        <h1 className=""> Products</h1>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <div className="dropdown mb-4">
          <select className="form-select-lg" value={selectedCategory} onChange={(e) => filterProductsByCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
          </select>
        </div>
        <div className="row">
          {filteredProducts.map((product, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="card">
                <img src={`http://localhost:8080/uploads/${product.image}`} className="card-img-top" alt={product.name} 
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text">Category: {product.categoryname}</p>
                  <button className="btn btn-success" onClick={() => addToCart(product)}>Add to cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
