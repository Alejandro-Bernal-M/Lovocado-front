'use client'
import { useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import CreateProductPopup from '@/components/createProductPopup/createProductPopup';
import styles from './adminProducts.module.css';

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
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>Created by: {product.createdBy?.firstName}</p>
          {product.productImages && product.productImages.map((image, index) => (
            <img key={index + 'image' + image.id} src={`${process.env.NEXT_PUBLIC_IMAGES}/${image.img}`} alt={product.name} className={styles.productImage}/>
          ))}
          <p>{categories.find(cat => cat._id === product.category)?.name}</p>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      ))}
    </div>
  );
}