import { useState, useEffect, useContext } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { PrivateRoute } from "../private-route";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { LogIn } from "../log-in";

import styles from "./app.module.css";

function App() {
  const [currentUser, setCurrentUser] = useState<any>({});
  const history = useHistory();


  useEffect(() => {
    setCurrentUser({});
  }, []);

  return (
    <>
    <Header />
        <main className={styles.content}>
          <Switch>
            <Route path='/login'>
              <LogIn />
            </Route>
            <PrivateRoute path="/">
           
            </PrivateRoute>
          </Switch>
        </main>
        <Footer />
    </> 
  );
}

export default App;
