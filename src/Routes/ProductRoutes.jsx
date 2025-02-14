import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductTable from '../Components/ProductTable';
import ProductForm from '../Components/ProductForm';

const ProductRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductTable />} />
      <Route path="/productform/:id?" element={<ProductForm />} />
    </Routes>
  );
};

export default ProductRoutes;
