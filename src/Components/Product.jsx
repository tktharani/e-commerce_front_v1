import { useState } from "react";
import ImageUploader from "./ImageUploader.jsx";

function Product(){
    const[data, setData] = useState({
        valName: "",
        valPrice: "",
        valDescription: ""
    });
    const dataGiven =  (e) => {
        const {name, value} = e.target
        setData({...data, [name]:value})
    }
    const submitProduct = () => {
        const product = {
            name: data.valName,
            price: data.valPrice,
            description: data.valDescription
        }
        fetch("http://localhost:8080/product/add", {
            headers:{
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(product)
        }).then(response => {
            console.log("Data Received " + response)
        })

    }
    return (
        <div>
           <h1>Add a Product</h1>
           Name: <input type="text" name="valName" value={data.valName} onChange={dataGiven} /> <br></br>
           Description : <input type="text" name="valDescription" value={data.valDescription} onChange={dataGiven} /> <br></br>
           Price : <input type="text" name="valPrice" value={data.valPrice} onChange={dataGiven} /> <br></br>
           <ImageUploader />
           <input type="button" value="Add Product" onClick={submitProduct} />
        </div>
    );
}

export default Product;