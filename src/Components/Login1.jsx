import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Navbar from './NavBar';


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
                 if(res.data.role=='admin'){
                  //admin page
                  navigate("/admin")
                 }else{
                  //user  page
                  navigate("/")
                 }
                 setFormData(res.data)
             }
        })
        
        .catch((error) =>{
          console.error("Error during fetch", error);
        });

     }

  return (
    <div>
        <Navbar />
        <div className="container  p-5">
        <form onSubmit={handleSubmit}>
        <label className="color:white p-3">UserName</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange}></input><br></br>
             
            <label className="p-4">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange}></input><br></br>

            <button  className="btn btn-success mx-4 px-3">Login</button>

            <Link to="/signup">Create New Account</Link>
        </form>   
        <div className="container">
           {Array.isArray(formData)&& formData.map((formData)=>(
            <div className="card" key={formData.id}>
                <h1>Welcome{formData.username}</h1>
                </div>
            ))}
            
    </div>
    </div>
        
        
        </div>
  )
}

export default Login1