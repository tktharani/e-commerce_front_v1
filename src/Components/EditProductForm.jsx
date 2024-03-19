import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProductForm() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadImage, setUploadImage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categoryname: "",
  });

  const { name, description, price, image, categoryname } = product;

  useEffect(() => {
    loadProduct();
    loadCategories(); 
  }, []);

  const loadProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product/update/${id}`);
      setProduct(response.data);
      setSelectedCategory(response.data.categoryname); 
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await axios.post("http://localhost:8080/file/upload", formData);
      setUploadImage(response.data);
      alert("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = { ...product, image: uploadImage, categoryname: selectedCategory };
    try {
      await axios.put(`http://localhost:8080/product/update/${id}`, updatedProduct);
      navigate("/admin");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name:</label>
          <input type="text" id="productName" className="form-control" placeholder="Enter product name" name="name" value={name} onChange={(e) => onInputChange(e)} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <input type="text" id="description" className="form-control" placeholder="Enter description" name="description" value={description} onChange={(e) => onInputChange(e)} />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input type="number" id="price" className="form-control" placeholder="Enter price" name="price" value={price} onChange={(e) => onInputChange(e)} />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category Name:</label>
          <select id="category" className="form-select" value={selectedCategory} onChange={handleSelectChange}>
            <option value="">Select category...</option>
            <option>fruits</option>
            <option>Vegetables</option>
            <option>Fresh fish</option>
            <option>Fresh meat</option>
            {categories.map(category => (
              <option key={category.id} value={category.categoryname}>{category.categoryname}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          {image && ( 
            <div>
              <img src={image} alt="Product" style={{ width: "250px" }} className="img-thumbnail" />
            </div>
          )}
          <input type="file" name="myImage" onChange={(event) => setSelectedImage(event.target.files[0])} className="form-control" />
          <button type="button" onClick={handleFile} className="btn btn-outline-primary mt-2">Upload Image</button>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary me-2">Submit</button>
          <Link className="btn btn-secondary" to="/admin">Cancel</Link>
        </div>
      </form>
    </div>
  );
          }