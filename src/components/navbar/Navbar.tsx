import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
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
          <Link href="/session">Signin</Link>
        </li>
      </ul>
    </nav>
  );
}