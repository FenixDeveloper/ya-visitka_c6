import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../private-route';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { LogIn } from '../log-in';
import { Admin } from '../../pages/admin-panel/admin';
import { AdminUsers } from '../../pages/admin-panel/admin-users';
import styles from './app.module.css';
import { AppContext } from '../../utils/AppContext';
// import { getUser } from '../../mockApi';
import Maps from '../maps/maps';
import { loginUser } from '../../utils/api';
import MainPage from '../../pages/MainPage/MainPage';
import VizitkaPage from '../../pages/VizitkaPage/VizitkaPage';
import { Profile } from '../../pages/profile/profile';
import { AuthPage } from '../../pages/authPage/authPage';
import { AppProvider } from '../../utils/AppContext';

function App() {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      loginUser().then((res) => {
        dispatch({ type: 'success', results: res });
      });
    }
  }, []);

  return (
    <AppProvider>
      <ApplicationView />
    </AppProvider>
  );
}

function ApplicationView() {

  return (
    <BrowserRouter>
      <Header />
      <main className={styles.content}>
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <PrivateRoute path="/" exact={true}>
            <MainPage />
          </PrivateRoute>
          <PrivateRoute path="/maps">
            <Maps />
          </PrivateRoute>
          <PrivateRoute path="/vizitka/:id">
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
    </BrowserRouter>
  );
}

export default App;
