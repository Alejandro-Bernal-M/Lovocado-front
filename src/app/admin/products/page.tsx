'use client'
import { useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import CreateProductPopup from '@/components/createProductPopup/createProductPopup';
import styles from './adminProducts.module.css';
import Product from '@/components/product/Product';

export default function AdminProducts() {
  const { products, loading, error } = useAppSelector((state) => state.products);
  const { categories } = useAppSelector((state) => state.categories);
  const [displayPopup, setDisplayPopup] = useState(false);

  return (
    <div>
      <h1>Admin Products</h1>
      <button onClick={() => setDisplayPopup(!displayPopup)}>Create Product</button>
      {displayPopup && <CreateProductPopup />}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        <p>Number of products: {products ? products.length : 0}</p>
      </div>
      {products.length === 0 && !loading && <p>No products found</p>}
      {products.length > 0 && products.map((product) => (
        <Product key={product._id} {...product} />
      ))}
    </div>
  );
}