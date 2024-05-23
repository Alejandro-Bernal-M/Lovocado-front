'use client'
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { getAllProducts } from '@/lib/features/products/productsSlice';
import { getCategories } from '@/lib/features/categories/categoriesSlice';

export default function AdminPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>

      <div>
        <ul>
          <li>
            <Link href="/admin/products">Products</Link>
          </li>
          <li>
            <Link href="/admin/categories">Categories</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};