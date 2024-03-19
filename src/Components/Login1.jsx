import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Navbar } from 'react-bootstrap';
import NavBar from './NavBar';



const Login1 = () => {
const navigate=useNavigate();
  const [formData , setFormData] = useState({
    username : "",
    password : ""
   })
 
    const handleChange =(event) =>{
        const {name,value}=event.target; 
        setFormData({...formData,[name]:value})
        console.log(name,value);
    }
    const handleSubmit =(event) =>{
        event.preventDefault();
        console.log(formData);
        axios.get(`http://localhost:8080/user/check?username=${formData.username}&password=${formData.password}`)
        .then((res)=>{
          console.log("===Login Details=",res)
          if(res.data == !formData.username && res.data == !formData.password){
                 alert("Enter valid details");
             }else {
                 console.log("Data",res.data)
                 if(res.data.role =='admin'){
                  //admin page
                  navigate("/admin")
                  // console.log(res.data)
                 }else{
                  //user  page
                  navigate("/")
                 }
                 setFormData(res.data)
             }
             console.log(setFormData)
        })
        
        .catch((error) =>{
          console.error("Error during fetch", error);
        });

     }

     return (
      <div>
        <Navbar />
      <div className="container p-5">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="text-white">Username</label>
            <input type="text" name="username" id="username" className="form-control" value={formData.username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="text-white">Password</label>
            <input type="password" name="password" id="password" className="form-control" value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success">Login</button>
          <Link to="/signup" className="ml-3 text-white">Create New Account</Link>
        </form>
        {Array.isArray(formData) && formData.map(formData => (
          <div className="card" key={formData.id}>
            <h2>Welcome {formData.username}</h2>
          </div>
        ))}
      </div>
      </div>
    );
  }
  
  export default Login1;