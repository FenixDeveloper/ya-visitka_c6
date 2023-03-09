import React, { useEffect, useContext } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { PrivateRoute } from '../private-route';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { LogIn } from '../log-in';
import { Admin } from '../../pages/admin-panel/admin';
import { AdminUsers } from '../../pages/admin-panel/admin-users';
import styles from './app.module.css';
import { SwitchProfile } from '../switch-profile/switch-profile';
import { AppContext } from '../../utils/AppContext';
import { getUser } from '../../mockApi';
import Maps from '../maps/maps';
import MainPage from '../../pages/MainPage/MainPage';
import VizitkaPage from '../../pages/VizitkaPage/VizitkaPage';
import { Profile } from '../../pages/profile/profile';
import { AuthPage } from '../../pages/authPage/authPage';

function App() {
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);

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
            <LogIn />
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
          {/* <Route path="/switch-profile">
            <SwitchProfile />
          </Route> */}
          <PrivateRoute path="/" exact={true}>
            <MainPage />
          </PrivateRoute>
          <PrivateRoute path="/maps">
            <Maps />
          </PrivateRoute>
          <PrivateRoute path="/vizitka">
            <VizitkaPage />
          </PrivateRoute>
          <PrivateRoute  path="/admin" exact>
            <Admin />
          </PrivateRoute >
          <PrivateRoute  path="/admin/users" exact>
            <AdminUsers />
          </PrivateRoute >
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
