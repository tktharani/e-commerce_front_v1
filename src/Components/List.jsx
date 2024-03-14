import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { Link } from "react-router-dom";



const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product/listproduct');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleSelectChange = (event) => {
    console.log("Selected Category ====>"+selectedCategory)
  
  setSelectedCategory(event.target.value);
  };
  

  return (
    <div>
      <NavBar />
      
          
    <div className="container mt-4">
     <p>
          Category Name:
          
          <select id="category" value={selectedCategory} onChange={handleSelectChange}>
                <option value="">Select category...</option>
                <option>fruits</option>
                <option><Link to="/vegetables/vegetables">Vegetables</Link></option>
                <option>Fresh fish</option>
                <option>Fresh meat</option>
                {categories.map(category => (
                    <option key={category.id} value={category.categoryname}>
                        {category.categoryname}
                    </option>
                ))}
            </select>
        </p>
      <h1 className="mb-4">Product List</h1>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src={`http://localhost:8080/uploads/${product.image}`} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Category: {product.categoryname}</p>
                <a href="#" class="btn btn-success">Add to cart</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductList;
