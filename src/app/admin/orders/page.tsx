'use client'
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

export default function Orders(){
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);
  const { products } = useAppSelector((state) => state.products);
  return (
    <div>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Logged user</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Shipping Address</th>
            <th>Total amount</th>
            <th>Products</th>
            <th>Payment status</th>
            <th>Payment type</th>
            <th>Order status</th>
            <th>Payment info</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user ? 'Yes' : 'No'}</td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>
                <p>City: {order.address.city}</p>
                <p>Country: {order.address.country}</p>
                <p>State: {order.address.state}</p>
                <p>Postal Code: {order.address.postal_code}</p>
                <p>Line1: {order.address.line1}</p>
                {order.address.line2 && <p>Line2: {order.address.line2}</p>}
              </td>
              <td>{order.totalAmount}</td>
              <td>
                {order.products.map((product) => (
                  <p key={product.product}>
                    {products.find((prod) => prod._id === product.product)?.name} - {product.quantity}
                  </p>
                ))}
              </td>
              <td>{order.paymentStatus}</td>
              <td>{order.paymentType}</td>
              <td>{order.orderStatus}</td>
              <td>
                <p>ID: {order.paymentInfo.id}</p>
                <p>Status: {order.paymentInfo.status}</p>
              </td>
              <td>{new Date(order.createdAt).toString()}</td>
              <td>{new Date(order.updatedAt).toString()}</td>
              <td>
                <button>Update status</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}