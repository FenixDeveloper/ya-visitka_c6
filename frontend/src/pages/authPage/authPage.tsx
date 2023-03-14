import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { getToken, loginUser } from '../../utils/api';
import { AppContext } from '../../utils/AppContext';
import image from '../../images/Iphone-spinner-2.gif';
import styles from './authPage.module.css';

interface IResponse {
  token: string;
}

export const AuthPage = () => {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);

  const authorizeUser = async (code: string) => {
    try {
      let response: IResponse | undefined = undefined;
      if (!localStorage.getItem('auth_token')) {
        response = await getToken(code);
        if (response && response.token) {
          const user = await loginUser();
          console.log(user);
          if (user) {
            user.user && dispatch({ type: 'success', results: user.user });
            history.replace({ pathname: '/' });
          } else {
            history.replace({ pathname: '/login' });
          }
        }
      } else {
        const user = await loginUser();
        console.log(user);
        if (user) {
          user.user && dispatch({ type: 'success', results: user.user });
          history.replace({ pathname: '/' });
        } else {
          history.replace({ pathname: '/login' });
        }
      }
    } catch (err) {
      console.log(err);
      history.replace({ pathname: '/login' });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const code = params.get('code');
    if (code) {
      authorizeUser(code);
    }
  }, []);

  return (
    <section className={styles.section}>
        <img src={image} alt="загрузка" />
    </section>
  );
};
