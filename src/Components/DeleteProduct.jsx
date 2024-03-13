import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function DeleteProduct(){
    const[product,setProduct] = useState([]);
    const {id} =useParams();

    useEffect(()=>{
        loadProduct()
    },[]);
    const loadProduct =async () =>{
        const result =await axios.get("http://localhost:8080/product");
        setProduct(result.data);
    };
    const deleteProduct=async(id)=>{
        await axios.delete(`https://localhost:8080/product/delete/${id}`)
        loadProduct();
    }
}