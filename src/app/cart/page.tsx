'use client'
import { useAppDispatch } from "@/lib/hooks";
import Link from "next/link";
import { clearCart, clearCartDB  } from "@/lib/features/cart/cartSlice";
import { useAppSelector } from "@/lib/hooks";
import apiEndPoints from "@/utils/routes";
import Product from "@/components/product/Product";

export default function CartPage(){
  const { items, totalProducts, totalPrices } = useAppSelector((state) => state.cart);
  const { token } = useAppSelector((state) => state.user);
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  function handleClearCart() {
    if(token) {
      dispatch(clearCartDB(token));
    }
    dispatch(clearCart());
  }

  async function handleCheckout() {
    let productsToCheckout = items.map((item) => {
      return {
        _id: item._id,
        quantity: item.quantity,
      }
    }
    );

    const data = {
      cartItems: productsToCheckout,
      totalAmount: totalPrices,
    }

    try {
      const response = await fetch(apiEndPoints.checkProductsForCheckout, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('result', result);
      if(result.checkStatus){
        window.location.href = '/checkout';
      }else {
        console.log('error', result.message)
      }
      alert(result.message)
    } catch (error) {
      alert('An error occurred, please try again later');
      console.error(error);
    }
    console.log('productsToCheckout', productsToCheckout);
  }

  return (
    <div>
    <h1>Your Cart</h1>
    <p>Total Products: {totalProducts}</p>
    <p>Total Price: {totalPrices}</p>
    {items.length > 0 && items.map((item) => (
      <div key={item._id}>
        { products.map((product) => {
          if(product._id === item._id){
            return(
              <> 
              <p>{item.quantity} x {product.name}</p>
              <Product key={product._id + 1} {...product} />
              <p>Unitary price: {item.price}</p>
              <p>Subtotal: {item.price * item.quantity}</p>
              </> 
            )
          }}
        )}
        
      </div>
    ))}
    <button onClick={handleCheckout} >
      Checkout
    </button>
    <button onClick={ handleClearCart }>Clean Cart</button>
  </div>
  );
}