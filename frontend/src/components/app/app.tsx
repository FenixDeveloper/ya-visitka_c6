import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { LogIn } from "../log-in/log-in";

import styles from "./app.module.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className={styles.content}>
        <Routes>
          <Route path='/login'>
            {/* <LogIn /> */}
          </Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
