import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AllProduct.css';
import { Modal, Button } from 'react-bootstrap';

export const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/product/delete/${id}`);
      fetchProducts(); // Refresh product list after deletion
      setShowDeleteModal(false); // Close delete modal after successful deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  

  return (
    <div>
      
      <div className='search-bar d-flex justify-content-center'>
        <input
          type="text"
          placeholder="Search by Product_Name"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control search-input"
        />
      </div>
      <table className="table table-success table-striped table-bordered border-success">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Category Name</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        {products
  .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .map(product => {
    console.log('Image Path:', product.image); 
      return (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.categoryname}</td>
        <td>
                {product.image && (
                  <img
                    src={`http://localhost:8080/file/upload/${product.image}`}
                    alt={product.name}
                    style={{ width: '70px', height: '60px' }}
                    onError={(e) => console.error('Error loading image:', e.message)} 
                  />
                )}
              </td>

        <td className=''>
          <Link className='btn btn-outline-success ' to={`/edit/${product.id}`}>Edit</Link>
        </td>
        <td>
          <button
            className='btn btn-outline-danger'
            onClick={() => {
              setProductIdToDelete(product.id);
              setShowDeleteModal(true);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  })}

        </tbody>
      </table>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteProduct(productIdToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your AddProductForm component here */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllProduct;
