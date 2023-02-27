import React, { useEffect, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { PrivateRoute } from "../private-route";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { LogIn } from "../log-in";
import styles from "./app.module.css";
import { SwitchProfile } from "../switch-profile/switch-profile";
import { AppContext } from "../../utils/AppContext";
import { getUser } from "../../mockApi";
import Maps from '../maps/maps';
import MainPage from "../../pages/MainPage/MainPage";
import VizitkaPage from '../../pages/VizitkaPage/VizitkaPage';
import { Profile } from "../../pages/profile/profile";

function App() {
  // const [currentUser, setCurrentUser] = useState<any>({});
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
          <Route path='/login'>
            <LogIn/>
          </Route>
          <Route path='/switch-profile'>
            <SwitchProfile />
          </Route>
          <Route path='/maps'>
            <Maps/>
          </Route>
          <PrivateRoute path='/' exact={true}>
            <MainPage />
          </PrivateRoute>
          <PrivateRoute path='/vizitka'>
            <VizitkaPage />
          </PrivateRoute>
          <Route path='/profile'>
            <Profile />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
