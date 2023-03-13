import { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './header.module.css';
import logo from '../../images/logo.svg';
import { loginUser } from '../../utils/api';
import profile from '../../images/profile.svg';
import { AppContext } from '../../utils/AppContext';

export const Header = () => {
  const { state, dispatch } = useContext(AppContext);
  const location = useLocation();
  const user: any = state.data;


  const getUser = async () => {
    const user: any = await loginUser();
    if (user) {
      dispatch({ type: 'success', results: user });
    }
  }

  useEffect(() => {
    if (!state.data) {
      if (localStorage.getItem('auth_token')) {
        getUser();
      }   
    }
  }, []);

  return (
    <header className={style.header}>
      {/* <Link to= {user && user?.user.role === "student" ?  "/" : `/${user?.user.cohort}`}>
        <img src={logo} alt="logo" className={style.logo} />
      </Link> */}
      {location.pathname !== '/login' && location.pathname !== '/auth' && (
        <div className={style.profile_box}>
          <div className={style.profile_container}>
            <img src={profile} alt="profile" className={style.avatar} />
            <span className={style.name}>{state.data && user?.user.name}</span>
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
