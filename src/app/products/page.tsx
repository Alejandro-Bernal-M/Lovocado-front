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
  const [ productsProccessed, setProductsProccessed ] = useState(false);

  const handleSelect = (id: any, name: string, all: boolean) => {
    setLoadingProducts(true);
    if (all) {
      setSelectedProducts(products);
      setCategoryTittle('All our');
    }else {
      let filteredProducts = products.filter((product) => product.category._id === id);
      setSelectedProducts(filteredProducts);
      setCategoryTittle(name);
    }
    setLoadingProducts(false);
    setProductsProccessed(true);
  }

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
    let firstCategoryButton = document.querySelector('.cat_li') as HTMLLIElement;
    if (firstCategoryButton) {
      firstCategoryButton.click();
    }
  }, []);

  return (
    <div>
      <h1> Our products</h1>
      { categories.length > 0 && (
        <ul className={styles.cat_ul}>
          <li className="cat_li" onClick={() => {handleSelect(0, '', true)}} >All products</li>
          {categories.map((category) => (
            <li className="cat_li" key={category._id} onClick={() => {handleSelect(category._id, category.name, false)}}>{category.name}</li>
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
        ((products.length > 0 && !loadingProducts && !productsProccessed ) && products.map((product) => (
          <Product key={product._id} {...product} />
        )))
      }
      </div>
      {selectedProducts.length === 0 && !loadingProducts && <p>No products found</p>}
    </div>
  );
}