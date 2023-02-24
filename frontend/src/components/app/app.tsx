import React, { useState, useEffect, useContext, FC } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { PrivateRoute } from '../private-route';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { LogIn } from '../log-in';
import styles from './app.module.css';
import { SwitchProfile } from '../switch-profile/switch-profile';
import { AppContext } from '../../AppContext ';
import { getUser } from '../../mockApi';
import Tooltip from '../tooltip/tooltip';
import CommentPost from '../comment-post/comment-post';
import CommentButton from '../comment-button/comment-button';

function App() {
  const [currentUser, setCurrentUser] = useState<any>({});
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);

  const auth = (): any => {
    history.push('/switch-profile');
  };

  useEffect(() => {
    setCurrentUser({});
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('user');
    if (userId) {
      dispatch({ type: 'success', results: getUser(Number.parseInt(userId)) });
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className={styles.content}>
        <Switch>
          <Route path="/login">
            <LogIn auth={auth} />
          </Route>
          <Route path="/switch-profile">
            <SwitchProfile />
          </Route>
          <PrivateRoute path="/"></PrivateRoute>
        </Switch>
      </main>
      <CommentButton commentCount={2} viewed={false} />
      <Tooltip children={<CommentPost children={<button />} />} />
      <Footer />
    </>
  );
}

export default App;
