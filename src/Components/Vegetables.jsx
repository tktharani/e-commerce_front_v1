import React, { useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Vegetables = () => {
  const { category } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/vegandfruits/${category}`);
      setCategoryData(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <div className="row">
        {categoryData.map((product) => (
          <div key={product.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src={`http://localhost:8080/uploads/${product.image}`} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Category: {product.categoryname}</p>
                <a href="#" className="btn btn-success">
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vegetables;
