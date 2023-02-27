import { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import style from './header.module.css';
import logo from '../../images/logo.svg';
import profile from '../../images/profile.svg';

export const Header = () => {
  return (
    <header className={style.header}>
      <img src={logo} alt="logo" className={style.logo} />
      <div className={style.profile_box}>
        <div className={style.profile_container}>
          <img src={profile} alt="profile" className={style.avatar} />
          <span className={style.name}>Константин Константиноповский</span>
        </div>
        <div className={style.profile_hidden}>
          <Link to={'/profile'} className={style.link}>
            Профиль
          </Link>
        </div>
      </div>
    </header>
  );
};
