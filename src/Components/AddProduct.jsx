import React, { useState } from 'react';
import axios from 'axios';

 export const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryname: '',
  });
  const [uploadedImage, setUploadedImage] = useState('');

  const handleFile = async () => {
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await axios.post('http://localhost:8080/file/upload', formData);
      setUploadedImage(response.data); // Store the uploaded image URL
      alert('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again later.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    if (!formData.name || !formData.description || !formData.price || !selectedCategory || !selectedImage) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/product/add', {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        categoryname: selectedCategory,
        image: uploadedImage,
      });
      console.log('Product added successfully:', response.data);
      alert('Your product has been added successfully');

      // Reset the form fields after successful submission
      setFormData({
        name: '',
        description: '',
        price: '',
        categoryname: '',
       
      });
      setSelectedImage(null);
      setUploadedImage('');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1>Add Product</h1>
      <div className="row">
        <div className="col-md-6">
          {selectedImage && (
            <div>
              <img
                alt="Uploaded Image"
                width={250}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button className="btn btn-danger me-2" onClick={() => setSelectedImage(null)}>Remove</button>
              <button className="btn btn-primary" onClick={handleFile}>Upload</button>
            </div>
          )}
          <input type="file" name="myImage" onChange={(e) => setSelectedImage(e.target.files[0])} />
        </div>
        <div className="col-md-6">
          <p>Product Name: <input type="text" className="form-control" placeholder="Enter product name" name="name" value={formData.name} onChange={handleChange} /></p>
          <p>Description: <input type="text" className="form-control" placeholder="Enter description" name="description" value={formData.description} onChange={handleChange} /></p>
          <p>Price: <input type="number" className="form-control" placeholder="Enter price" name="price" value={formData.price} onChange={handleChange} /></p>
          <p>Category Name:
            <select className="form-select" id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Select category...</option>
              <option>fruits</option>
              <option>Vegetables</option>
              <option>fish</option>
              <option>meat</option>
              {/* Add dynamic options for categories */}
            </select>
          </p>
          <button className="btn btn-success" onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;