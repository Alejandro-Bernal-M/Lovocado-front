'use client'
import styles from './Navbar.module.css';
import Link from 'next/link';
import { useAppSelector, useAppDispatch} from "../../lib/hooks";
import { signOut, signIn } from '@/lib/features/user/userSlice';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { hideCart, displayCart, getCartItemsDB } from '@/lib/features/cart/cartSlice';
import CartPopup from '../cart/cartPopup';
import { getAllProducts } from '@/lib/features/products/productsSlice';

export default function Navbar() {
  const {user} = useAppSelector((state) => state.user);
  const {token} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const allowedRoutes = ['/session', '/', '/products', '/cart', '/checkout'];
  const { showCart } = useAppSelector((state) => state.cart);

  const handleSignOut = () => {
    dispatch(signOut());
  }

  useEffect(() => {
    if (typeof window !== 'undefined') { // Check if running in the browser
      if (token === '' && user.email === '') {
        const storageToken = window.localStorage.getItem('token');
        const storageUser = window.localStorage.getItem('user');
        if (storageToken && storageUser) {
          dispatch(signIn({ token: storageToken, user: JSON.parse(storageUser) }));
          dispatch(getCartItemsDB(storageToken));
        }
      }
      dispatch(getAllProducts());
    }
  }, []);

  function secureRoute() {
    if (user.email === '' && !allowedRoutes.includes(pathName)) {
      window.location.href = '/session';
    }
  }

  function adminRoute() {
    if (user.role !== 'admin' && pathName.includes('/admin')) {
      window.location.href = '/';
    }
  }

  useEffect(() => {
    secureRoute();
    adminRoute();
  }
  , [pathName]);
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo} >logo</div>
      <ul className={styles.navbar__links} >
        <li className={styles.navbar__link}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navbar__link}>
          <Link href="/products">Products</Link>
        </li>
        <li className={styles.navbar__link}>
          <button onClick={() => showCart ? dispatch(hideCart()) : dispatch(displayCart())}>Cart</button>
        </li>
        {showCart && <CartPopup />}
        <li className={styles.navbar__link}>
          {token ? (
            <button onClick={handleSignOut}>Signout</button>
          ) : (
            <Link href="/session">Signin</Link>
          )
        }
        </li>
        { user.role === 'admin' && (
          <li className={styles.navbar__link}>
            <Link href="/admin" >Admin</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}