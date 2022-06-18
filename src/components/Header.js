import { Link } from "react-router-dom";
import styles from "../css/Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <span>Movie APP</span>
      </Link>
    </header>
  );
}

export default Header;
