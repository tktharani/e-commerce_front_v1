import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar.jsx';
import Product from './Components/Product.jsx';
import Demo from './Components/Demo.jsx';
import AddProduct from './Components/AddProduct.jsx'; // Correct import without curly braces
import List from './Components/List.jsx';
import Admin from './Components/Admin.jsx';
import Login1 from './Components/Login1.jsx';

import SignUpPage from './Components/SignUpPage.jsx';
import EditProductForm from './Components/EditProductForm.jsx';
import NotFoundPage from './Components/NotFoundPage.jsx';
import Vegetables from './Components/Vegetables.jsx';
import HeroSection from './Components/HeroSection.jsx';
import Footer from './Components/Footer.jsx';
import User from './Components/User.jsx';
import AllProduct from './Components/AllProduct.jsx';
import Cart from './Components/Cart.jsx';
import CartSummaryPage from './Components/CartSummaryPage.jsx';
import CheckoutPage from './Components/CheckOutPage.jsx';

const cartItems = [];

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/product" element={<AllProduct />} />
          <Route path="/addproducts" element={<AddProduct />} />
          <Route path="/" element={<List />} />
          <Route path="/user" element={<User />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login1 />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/edit/:id" element={<EditProductForm />} />
          <Route path="/vegetables/:category" element={<Vegetables />} />
          {/* <Route path="/cart" element={<Cart />} />  */}
          <Route path="/cart-summary" element={<CartSummaryPage />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
