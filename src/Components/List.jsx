import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import './List.css';
import CartModal from './CartModal';
import { Carousel } from 'react-bootstrap';
import HeroSection from './HeroSection';

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWeight, setSelectedWeight] = useState('lkg');
  const [errorMessage, setErrorMessage] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);
  const [productWeights, setProductWeights] = useState({});

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
      setCartItems([...cartItems, product]);
      setCartClicked(true); 
        } catch (error) {
      console.error('Error adding product to cart:', error);
      setErrorMessage('Error adding product to cart. Please try again later.');
    }
  };
  
  const handleCartClick = () => {
    setShowModal(true);
    setCartClicked(false); 
  };
  const getPriceByWeight = (product) => {
    const selectedWeight = productWeights[product.id] || 'lkg'; // Get selected weight for the product
    switch (selectedWeight) {
      case 'lkg':
        return product.price; 
      case '500g':
        return product.price / 2; 
      case '250g':
        return product.price / 4; 
      default:
        return product.price; 
    }
  };
  const handleWeightChange = (productId, weight) => {
    setProductWeights({ ...productWeights, [productId]: weight }); // Update selected weight for the product
  };

  

  return (
    <div>
      <NavBar />
      <Carousel className="custom-carousel" >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/Banner-8.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <h3>First slide label</h3> */}
            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/Banner-9.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            {/* <h3>Second slide label</h3> */}
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/Banner-10.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            {/* <h3>Second slide label</h3> */}
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/Banner-5.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            {/* <h3>Second slide label</h3> */}
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/Banner-7.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            {/* <h3>Second slide label</h3> */}
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        {/* Add more Carousel.Item components as needed */}
      </Carousel>
      <div className="container">
        <h1 className="">Products</h1>
        <div className='d-flex justify-content-end align-items-center mb-3' onClick={handleCartClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill={cartClicked ? 'green' : 'currentColor'} className="bi bi-cart-check" viewBox="0 0 16 16">
            <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            <text x="16" y="8" fontSize="10" fill="red">{cartItems.length > 0 ? cartItems.length : ''}</text>
          </svg>
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <div className="dropdown mb-4">
          <select className="form-select-lg" value={selectedCategory} onChange={(e) => filterProductsByCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="meat">meat</option>
            <option value="fish">fish</option>
          </select>
        </div>
        
        <div className="row">
          {filteredProducts.map((product, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="card product-card">
                <img src={`http://localhost:8080/uploads/${product.image}`} className="card-img-top product-image" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <div className="dropdown mb-2">
                    <select
                      className="form-select"
                      value={productWeights[product.id] || 'lkg'} // Use selected weight for the product
                      onChange={(e) => handleWeightChange(product.id, e.target.value)}
                    >
                      <option value="lkg">1 kg</option>
                      <option value="500g">500 g</option>
                      <option value="250g">250 g</option>
                    </select>
                  </div>
                  <p className="card-text"> Rs.{getPriceByWeight(product)}</p> 
       
                  <p className="card-text">Category: {product.categoryname}</p>
                  <button className="btn btn-success" onClick={() => addToCart(product)}>Add to cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      {showModal && <CartModal cartItems={cartItems} closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default ProductList;
