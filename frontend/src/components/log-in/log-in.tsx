import { Link } from "react-router-dom";
import styles from "./log-in.module.css";

export const LogIn = () => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.header}>С кем я учусь?</h1>
        <button className={styles.button}>
          <Link className={styles.text} to='/switch-profile'>
            Войти с Яндекс ID
          </Link>
        </button>
      </div>
    </div>
  );
};
