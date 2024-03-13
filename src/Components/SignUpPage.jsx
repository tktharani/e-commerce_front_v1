import React, {useState} from 'react';
import { Link } from 'react-router-dom';


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
      <div className="container bg-secondary p-5">
       <h2 className='text-uppercase text-danger'>Register form</h2>
         <form onSubmit={handleSubmit}>
            <label className='text-white p-2'>User_Name:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange}></input><br></br>
            <label  className='text-white p-2'>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange}></input><br></br>
            <label className='text-white p-2'>Email</label>
            <input type="text" name="email" value={formData.email} onChange={handleChange}></input><br></br>
             
            <label className='text-white p-2'>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange}></input><br></br>

            <button  className="btn btn-success m-2">Register</button>
            <Link to="/login" className="">Back to Login</Link>
 

        </form>
      </div>
    </div>
  )
}

export default SignUpPage;
