import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Nav, Modal, Button } from 'react-bootstrap'; 
import AllProduct from './AllProduct.jsx';
import User from './User.jsx';
import AddProductForm from './AddProduct';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('active'); 
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product/listproduct');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products. Please try again later.');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='admin-container '>
      <h1 className='text-success text-center'>Admin Page</h1>
      <Link to="/login" className="d-flex justify-content-end m-2 btn-info"><button>Logout</button></Link>
      <div className="d-flex justify-content-end m-2 btn-warning">
      <button  className=''onClick={() => setShowAddModal(true)}>Add Product</button>
      </div>

      

      <Nav className="nav-pills m-2">
        <Nav.Item>
          <Nav.Link className={`nav-link ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>Product</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={`nav-link ${activeTab === 'user' ? 'active' : ''}`} onClick={() => setActiveTab('user')}>User</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="tab-content">
        {activeTab === 'active' && <AllProduct />}
        {activeTab === 'user' && <User />}
      </div>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProductForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          {/* Add functionality to submit the form and update product list */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
