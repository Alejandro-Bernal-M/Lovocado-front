'use client'
import { useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import CreateCategoryPopup from '@/components/createCategoryPopup/CreateCategoryPopup';

export default function AdminProducts() {

  const {categories, loading, error} = useAppSelector((state) => state.categories);
  const [displayCategoryPopup, setDisplayCategoryPopup] = useState(false);


  return (
    <div>
      <h1>Admin Categories</h1>
      <button onClick={() => setDisplayCategoryPopup(!displayCategoryPopup)}>Create Category</button>
      {displayCategoryPopup && <CreateCategoryPopup />}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {categories && categories.length > 0 && categories.map((category) => (
        <div key={category._id}>
          <h2>{category.name}</h2>
          <img src={`${process.env.NEXT_PUBLIC_IMAGES}/${category.categoryImage}` } alt={category.name} height={50} width={50}/>
        </div>
      ))}
    </div>
  );
}