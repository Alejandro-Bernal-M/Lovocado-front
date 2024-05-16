'use client'
import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/features/categories/categoriesSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import CreateCategoryPopup from '@/components/createCategoryPopup/createCategoryPopup';

export default function AdminProducts() {
  const dispatch = useAppDispatch();
  const {categories, loading, error} = useAppSelector((state) => state.categories);
  const [displayCategoryPopup, setDisplayCategoryPopup] = useState(false);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  console.log('categories',categories);

  return (
    <div>
      <h1>Admin Categories</h1>
      <button onClick={() => setDisplayCategoryPopup(true)}>Create Category</button>
      {displayCategoryPopup && <CreateCategoryPopup />}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {categories && categories.length > 0 && categories.map((category) => (
        <div key={category._id}>
          <h2>{category.name}</h2>
          <img src={`${process.env.NEXT_PUBLIC_IMAGES}/${category.categoryImage}` } alt={category.name} />
        </div>
      ))}
    </div>
  );
}