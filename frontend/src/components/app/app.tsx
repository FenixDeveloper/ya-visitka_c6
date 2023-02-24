import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { LogIn } from "../log-in";

import styles from "./app.module.css";
import { SwitchProfile } from '../switch-profile/switch-profile';
import { AppContext } from '../../AppContext ';
import { getUser } from '../../mockApi';

function App() {
  const { state, dispatch } = useContext(AppContext);
  useEffect(() => {
    const userId = localStorage.getItem('user')
    if (userId) {
      dispatch({ type: 'success', results: getUser(Number.parseInt(userId)) })
    }
  }, [dispatch])
  return (
    <BrowserRouter>
      <Header />
      <main className={styles.content}>
        <Switch>
          <Route path='/login'>
            <LogIn />
          </Route>
          <Route path='/switch-profile'>
            <SwitchProfile />
          </Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
