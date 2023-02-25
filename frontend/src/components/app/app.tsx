import React, { useState, useEffect, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { PrivateRoute } from "../private-route";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { LogIn } from "../log-in";
import styles from "./app.module.css";
import { SwitchProfile } from "../switch-profile/switch-profile";
import { AppContext } from "../../utils/AppContext";
import { getUser } from "../../mockApi";
import MainPage from "../../pages/MainPage/MainPage";

function App() {
  // const [currentUser, setCurrentUser] = useState<any>({});
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (userId) {
      dispatch({ type: "success", results: getUser(Number.parseInt(userId)) });
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className={styles.content}>
        <Switch>
          <Route path='/login'>
            <LogIn/>
          </Route>
          <Route path='/switch-profile'>
            <SwitchProfile />
          </Route>
          <PrivateRoute path='/'>
            <MainPage />
          </PrivateRoute>
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
