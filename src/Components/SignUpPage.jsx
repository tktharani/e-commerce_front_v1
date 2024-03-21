import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';


const SignUpPage = () => {
    const [formData , setFormData] = useState({
        username: "",
        password: "",
        email:"",
        address:"",
        role:"",
      })
    
    
       const handleChange =(event) =>{
           const {name,value}=event.target; 
           setFormData({...formData,[name]:value})
           console.log(name,value);
       }
       const handleSubmit =(event) =>{
           event.preventDefault();
           console.log(formData);
           if(FormData.name==' '){
             console.log("not value")
           }
           else{
           const SignUpPage ={
             
             username:formData.username,
             password:formData.password,
             email:formData.email,
             address:formData.address,
             role:formData.role,
           }
         
           fetch("http://localhost:8080/user/add",{
             headers:{
               "Content-Type":"application/json"
             },
             method: 'POST',
             body: JSON.stringify(SignUpPage)
           }) .then((response)=>{
             console.log("Data received" +response);
             alert("Your are successfully Registered");
           })
           }
       }

       return (
        <div>
          <NavBar />
          <div className="container bg-secondary p-5">
            <h2 className='text-uppercase text-danger mb-4'>Register form</h2>
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group">
                <label htmlFor="username" className="text-white p-2">Username</label>
                <input type="text" name="username" id="username" className="form-control" value={formData.username} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="text-white p-2">Password</label>
                <input type="password" name="password" id="password" className="form-control" value={formData.password} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="text-white p-2">Email</label>
                <input type="email" name="email" id="email" className="form-control" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="address" className="text-white p-2">Address</label>
                <input type="text" name="address" id="address" className="form-control" value={formData.address} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-success mr-2">Register</button>
              <Link to="/login" className="text-white">Back to Login</Link>
            </form>
          </div>
        </div>
      );
    }
    
    export default SignUpPage;
    