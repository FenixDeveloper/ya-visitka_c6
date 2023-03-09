import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { getToken, loginUser } from '../../utils/api';
import { AppContext } from '../../utils/AppContext';

interface IResponse {
  token: string;
}

export const AuthPage = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);

  const authorizeUser = async (code: string) => {
    try {
      let response: IResponse | undefined = undefined;
      if (!localStorage.getItem('auth_token')) {
        response = await getToken(code);
        if (response && response.token) {
          const user = await loginUser();
          console.log(user);
          if (user) {
            dispatch({ type: 'success', results: user });
            history.replace({ pathname: '/' });
          } else {
            history.replace({ pathname: '/login' });
          }
        }
      } else {
        const user = await loginUser();
        console.log(user);
        if (user) {
          dispatch({ type: 'success', results: user });
          history.replace({ pathname: '/' });
        } else {
          history.replace({ pathname: '/login' });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const code = params.get('code');
    if (code) {
      authorizeUser(code);
    }
  }, []);

  return <div></div>;
};
