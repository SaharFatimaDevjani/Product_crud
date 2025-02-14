import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductForm = () => {
  const apiURL = 'https://679b546033d31684632377e6.mockapi.io/Products';
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const { id } = useParams(); // Extracting id directly

  // Fetch existing product data if editing
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const res = await axios.get(`${apiURL}/${id}`);
          if (res.status === 200) {
            setFormData(res.data);
          }
        } catch (error) {
          setErrorMsg("Failed to fetch Data!");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]); // Runs when id changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.price) {
      setErrorMsg("Fields can't be empty!");
      return;
    }

    try {
      setLoading(true);
      if (id) {
        await axios.put(`${apiURL}/${id}`, formData);
      } else {
        await axios.post(apiURL, formData);
      }
      
      Swal.fire({
        title: "Done!",
        text: id ? "Changes saved successfully" : "Product added successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });

      setFormData({
        name: "",
        description: "",
        price: 0,
      });

    } catch (error) {
      setErrorMsg("Couldn't perform the desired operation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      {errorMsg && <h1 className='error'>{errorMsg}</h1>}
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>{id ? "Edit Product" : "Add Product"}</h2>

        <input onChange={handleInputChange} type="text" name="name" placeholder="Product Name" className="product-input" value={formData.name} />

        <textarea onChange={handleInputChange} name="description" placeholder="Description" className="product-textarea" value={formData.description}></textarea>

        <input onChange={handleInputChange} type="number" name="price" placeholder="Price" className="product-input" value={formData.price} />

        <button className="button blueBack" disabled={loading} type="submit">
          {id ? (loading ? "Updating..." : "Update") : (loading ? "Adding..." : "Add")}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
