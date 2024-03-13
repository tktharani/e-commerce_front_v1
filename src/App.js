import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar.jsx';
import Product from './Components/Product.jsx'
import Demo from './Components/Demo.jsx'
import { AddProduct } from './Components/AddProduct.jsx';
import List from './Components/List.jsx';
import Admin from './Components/Admin.jsx';
import Login1 from './Components/Login1.jsx';

import SignUpPage from './Components/SignUpPage.jsx';
import EditProductForm from './Components/EditProductForm.jsx';
import NotFoundPage from './Components/NotFoundPage.jsx';
import DeleteProduct from './Components/DeleteProduct.jsx';


function App() {
  return (
    <div className="App">
      
       <BrowserRouter>
       <Routes>
           
           <Route path="/addproducts" element={<AddProduct />}></Route>
           <Route path="/" element={<List />}></Route>
           <Route path="/signup" element={<SignUpPage />}></Route>
           <Route path="/admin" element={<Admin />}></Route>
           <Route path="/login" element={<Login1 />}></Route>
           <Route path="*" component={NotFoundPage} />
           <Route path="/edit/:id" element={<EditProductForm />} />   
           {/* <Route path="/delete" element={<DeleteProduct />} />               */}
           
           
        </Routes>
        </BrowserRouter>
        
      
      
    </div>
  );
}

export default App;
