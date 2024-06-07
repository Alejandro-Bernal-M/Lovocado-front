'use client'
import { useAppDispatch } from "@/lib/hooks";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { clearCart } from "@/lib/features/cart/cartSlice";

export default function CartPopup() {
	const dispatch = useAppDispatch();
	const { token } = useAppSelector((state) => state.user);
	const { products } = useAppSelector((state) => state.products);
	const { items, totalPrices, totalProducts } = useAppSelector((state) => state.cart);
	console.log('items', items);
	return (
		<div>
			<h1>Your Cart</h1>
			<p>Total Products: {totalProducts}</p>
			<p>Total Price: {totalPrices}</p>
			{items.length > 0 && items.map((item) => (
				<div key={item._id}>
					<p>{item.quantity} x {products.find((product) => product._id === item._id)?.name}</p>
					<p>Unitary price: {item.price}</p>
					<p>Subtotal: {item.price * item.quantity}</p>
				</div>
			))}
			{/* <Link href="/checkout">
				<a>Checkout</a>
			</Link> */}
			<button>
				<Link href="/cart">
					Inspect your cart
				</Link>
			</button>
			<button onClick={() => dispatch(clearCart())}>Clean Cart</button>
		</div>
	)
}