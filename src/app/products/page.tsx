'use client'
import { useAppDispatch } from "@/lib/hooks";
import { useAppSelector } from "@/lib/hooks";
import { getAllProducts } from '@/lib/features/products/productsSlice';
import { getCategories } from '@/lib/features/categories/categoriesSlice';
import  styles  from './products.module.css';
import { useEffect, useState } from "react";
import type { ProductType } from '@/lib/types';
import  Product  from '@/components/product/Product'

export default function Products() {
  const dispatch = useAppDispatch();
  const { products, error } = useAppSelector((state) => state.products);
  const { categories } = useAppSelector((state) => state.categories);
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);
  const [ loadingProducts, setLoadingProducts ] = useState(false);
  const [categoryTittle, setCategoryTittle] = useState('' as string);

  const handleSelect = (id: any, name: string) => {
    setLoadingProducts(true);
    let filteredProducts = products.filter((product) => product.category._id === id);
    setSelectedProducts(filteredProducts);
    setCategoryTittle(name);
    setLoadingProducts(false);
  }

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
    let firstCategoryButton = document.querySelector('.cat_li') as HTMLLIElement;
    if (firstCategoryButton) {
      firstCategoryButton.click();
    }
  }, []);
  console.log('products', products)

  return (
    <div>
      <h1> Our products</h1>
      { categories.length > 0 && (
        <ul className={styles.cat_ul}>
          {categories.map((category) => (
            <li className="cat_li" key={category._id} onClick={() => {handleSelect(category._id, category.name)}}>{category.name}</li>
          ))}
        </ul>
      )}
      <h2>{categoryTittle != '' ? categoryTittle : "All our" } products</h2>
      {loadingProducts && <p>Loading...</p>}
      {error && <p> We had an error loading our products, please try again</p>}
      <div className={styles.products}>
        {selectedProducts.length > 0 ? selectedProducts.map((product) => (
          <Product key={product._id} {...product} />
        ))
        :
        ((products.length > 0 && !loadingProducts) && products.map((product) => (
          <Product key={product._id} {...product} />
        )))
      }
      </div>
      {selectedProducts.length === 0 && !loadingProducts && <p>No products found</p>}
    </div>
  );
}