import React from 'react';
import Button from './Button'; // Make sure you have the Button component imported
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductTable = () => {
  const [productData, setProductData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const apiURL = 'https://679b546033d31684632377e6.mockapi.io/Products';

  const getProductData = async () => {
    try {
      setLoading(true)
      const res = await axios.get(apiURL);
      if (res.status === 200) {
        setProductData(res.data);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
    finally {
      setLoading(false)
    }
  };

  const handleDelete = async (id) => {
    Swal.fire(
      {
        title: "Are you sure?",
        text: "Product will be deleted permanently.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "red",
        cancelButtonText: "No! Cancel",
      }
    ).then((result) => {
      if (result.isConfirmed) {
        deleteConfirmed(id);
      }
    })
  }



  const deleteConfirmed = async (id) => {
    setLoading(true)
    try {
      const res = await axios.delete(`${apiURL}/${id}`)
      if (res.status === 200) {
        getProductData();
      }
    } catch (error) {
      setErrorMsg("Failed to fetch Data!");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
  }, []);




  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  } else {
    return (

      <div className="tableContainer">
        {errorMsg && <h1 className='error'>{errorMsg}</h1>}
        <div className="buttonContainer">
          <Button url="/productform" text="Add Product" />
        </div>

        {productData && productData.length > 0 &&
          <>
            <h1 className="title">Product Table</h1>
            <table className="table" border={1}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td className='actionButtons'>
                        <Link className="button yellowBack" to={`productform/${product.id}`} >Edit</Link>
                        <button onClick={() => handleDelete(product.id)} className="button redBack">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        }
      </div>

    );
  }

};

export default ProductTable;
