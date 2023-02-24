import { useState, useContext } from "react";
import styles from "./log-in.module.css";

export const LogIn = (props: {auth: () => any}) => {
  const { auth } = props;
  

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.header}>С кем я учусь?</h1>
        <button className={styles.button} onClick={auth}>
          <p className={styles.text}>Войти с Яндекс ID</p>
        </button>
      </div>
    </div>
  );
};
