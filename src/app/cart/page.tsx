'use client'
import { useAppSelector } from "@/lib/hooks";

export default function CartPage(){
  const { items, totalProducts, totalPrices } = useAppSelector((state) => state.cart);

  return (
    <div>
      <h1>Cart</h1>
      <p>Cart page content</p>
      {/* {items[0]._id === '' && <p>Your cart is empty</p>} */}

    </div>
  );
}