'use client'
import { useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import CreateCategoryPopup from '@/components/createCategoryPopup/CreateCategoryPopup';
import EditCategoryPopup from '@/components/EditCategoryPopup/EditCategoryPopup';
import { Category } from '@/lib/types';

export default function AdminProducts() {

  const {categories, loading, error} = useAppSelector((state) => state.categories);
  const [displayCategoryPopup, setDisplayCategoryPopup] = useState(false);
  const [categoryForEdit, setCategoryForEdit] = useState({} as Category);
  const [editCategoryPopup, setEditCategoryPopup] = useState(false);
  const [categoriesForEdit, setCategoriesForEdit] = useState<null | Category[]>(null);

  function handleEdit(category: Category) {
    if (category) {
      setCategoryForEdit(category);
      if (categories.length > 0) {
        setCategoriesForEdit(categories);
      }
      setEditCategoryPopup(true);
    } else {
      console.error('Invalid category:', category);
    }
  }

  console.log(categories);

  return (
    <div>
      <h1>Admin Categories</h1>
      <button onClick={() => setDisplayCategoryPopup(!displayCategoryPopup)}>Create Category</button>
      {displayCategoryPopup && <CreateCategoryPopup />}
      {editCategoryPopup && <EditCategoryPopup categories={categoriesForEdit} category={categoryForEdit} setEditPopup={setEditCategoryPopup} />}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {categories && categories.length > 0 && categories.map((category) => (
        <div key={category._id}>
          <h2>{category.name}</h2>
          <img src={`${process.env.NEXT_PUBLIC_IMAGES}${category.categoryImage}` } alt={category.name} height={50} width={50}/>
          <button onClick={() => {handleEdit(category)}}>Edit</button>
        </div>
      ))}
    </div>
  );
}