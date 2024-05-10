import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>

      <div>
        <ul>
          <li>
            <Link href="/admin/products">Products</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};