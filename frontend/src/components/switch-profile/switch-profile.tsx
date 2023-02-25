import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AppContext } from '../../utils/AppContext';
import { getUser, reset } from '../../mockApi';
import styles from './switch-profile.module.css';

export const SwitchProfile = () => {

  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();

  const renderUserInfo = () => {
    if (state.data) {
      console.log(state.data);
      const userInfo = state.data;
      return (<>
        <p>{userInfo.name}</p>
        <p>{userInfo.email}</p>
        <img src={userInfo.photo || ""} alt="avatar" />
        <p>{userInfo.role}</p></>
      )
    } else {
      return null
    }

  }
  const resetHandler = () => {
    dispatch({ type: 'success', results: reset() })
    history.push('/login');
  }

  const setUser = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    dispatch({ type: 'success', results: getUser(id) });
    history.replace({ pathname: "/" });
  }

  return (
    <div className={styles.section}>
      <button onClick={(e) => setUser(e, 0)}>Студент  №1</button>
      <button onClick={(e) => setUser(e, 1)}>Студент  №2</button>
      <button onClick={(e) => setUser(e, 2)}>Куратор</button>
      <button onClick={resetHandler}>reset</button>
      {renderUserInfo()}
    </div >
  );
}
