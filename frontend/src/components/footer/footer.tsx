import React from "react";
import style from "./footer.module.css"

export const Footer = () => {
  
  return (
    <footer className={style.footer}>
      <span className={style.text}>© Визитки</span>
      <span className={style.text}>Яндекс Практикум</span>
    </footer>
  );
};