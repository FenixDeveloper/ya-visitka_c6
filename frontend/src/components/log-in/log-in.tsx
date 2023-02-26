import { Link } from "react-router-dom";
import styles from "./log-in.module.css";

export const LogIn = () => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.header}>С кем я учусь?</h1>
        <button className={styles.button}>
          {/* <a className={styles.text} href="https://oauth.yandex.com/authorize?response_type=code&client_id=0cdebeaa249342658d6f8a1f5eb5eb3e">
             Войти с Яндекс ID
          </a> */}
          <Link className={styles.text} to='/switch-profile'>
            Войти с Яндекс ID
          </Link>
        </button>
        </div>
    </div>
  );
};
