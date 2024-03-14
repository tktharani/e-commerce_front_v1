import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

export const AddProduct = () => {

  //Set Image
  let uploadimage = null;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  // const [category, setCategory] = useState();
  

  const handleFile = () => {
    console.log("hello world")
    const formData = new FormData();
    formData.append("file", selectedImage);

    fetch("http://localhost:8080/file/upload", {
      method: 'POST',
      body: formData,
      dataType: "jsonp"
    })
      .then(response => response.text())
      .then(text => {
        console.log(text)
        uploadimage = text;
        console.log("===Upload Image====="+uploadimage)
        alert("upload image successfully")
      })
  }

  //Add Products

  const [formData, setData] = useState({
    name: "",
    description: "",
    price: "",
    categoryname : ""

  })


  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...formData, [name]: value })
    console.log(name, value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    
    // Validate form fields
    if (!formData.name || !formData.description || !formData.price || !selectedCategory || !selectedImage) {
      alert("Please fill in all fields");
      return; 
    }
  
    
    try {
      const response = await axios.post('http://localhost:8080/product/add', {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        categoryname: selectedCategory,
        image: uploadimage
      });
      console.log('Product added successfully:', response.data);
      alert("Your added product sucessfully")
      
      // Reset the form fields after successful submission
      setData({
        name: "",
        description: "",
        price: "",
        categoryname: ""
      });
      setSelectedImage(null);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

const handleSelectChange = (event) => {
  console.log("Selected Category ====>"+selectedCategory)

setSelectedCategory(event.target.value);
};


  return (
    <div>
      <div>

        {selectedImage && (
          <div>
            <img
              alt="not found"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
            <button onClick={() => handleFile()}>Upload</button>
          </div>
        )}
        <p>Product Name : <input type='text' placeholder='enter your productname' name='name' value={formData.name} onChange={handleChange} /></p>
        <p>Description : <input type='text' placeholder='enter your description' name='description' value={formData.description} onChange={handleChange} /></p>
        <p>Price : <input type='number' placeholder='enter your price' name='price' value={formData.price} onChange={handleChange} /></p>

        <p>
          Category Name:
          
          <select id="category" value={selectedCategory} onChange={handleSelectChange}>
                <option value="">Select category...</option>
                <option>fruits</option>
                <option>Vegetables</option>
                <option>Fresh fish</option>
                <option>Fresh meat</option>
                {categories.map(category => (
                    <option key={category.id} value={category.categoryname}>
                        {category.categoryname}
                    </option>
                ))}
            </select>
        </p>
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
      <button onClick={handleSubmit}>Add</button>
    </div>
  )
}


