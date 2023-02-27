import { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './admin-panel.module.css';

export const SwitchPage = () => {

  return (
    <nav className={styles.nav}>
      <Link className={
                      ( window.location.pathname === '/admin/users'
                        ? `${styles.text_dark}` 
                        : `${styles.text_light}`) +
                        ` ${styles.text_header}`
                    } to='/admin/users'>студенты</Link>
      <Link className={
                      ( window.location.pathname === '/admin'
                      ? `${styles.text_dark}` 
                      : `${styles.text_light}`) +
                      ` ${styles.text_header}`
                    } to='/admin'>комментарии</Link>
    </nav>
  );
};