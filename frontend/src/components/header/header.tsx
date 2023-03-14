import { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './header.module.css';
import logo from '../../images/logo.svg';
import { loginUser } from '../../utils/api';
import profile from '../../images/profile.svg';
import { AppContext } from '../../utils/AppContext';

export const Header = () => {
  const { state } = useContext(AppContext);
  const location = useLocation();

  return (
    <header className={style.header}>
      <Link to= {state.data && state.data.role === "student" ?  "/" : `/${state.data && state.data.cohort}`}>
        <img src={logo} alt="logo" className={style.logo} />
      </Link>
      {location.pathname !== '/login' && location.pathname !== '/auth' && state.data && state.data.role === 'student' && (
        <div className={style.profile_box}>
          <div className={style.profile_container}>
            <img src={profile} alt="profile" className={style.avatar} />
            <span className={style.name}>{state.data && state.data.name}</span>
          </div>
          <div className={style.profile_hidden}>
            <Link to={'/profile'} className={style.link}>
              Профиль
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
