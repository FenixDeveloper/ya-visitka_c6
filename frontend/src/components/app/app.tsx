import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { LogIn } from "../log-in";

import styles from "./app.module.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className={styles.content}>
        <Switch>
          <Route path='/login'>
            <LogIn />
          </Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
