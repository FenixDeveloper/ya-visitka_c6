import { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AppContext } from '../../AppContext ';
import { getUser, reset } from '../../mockApi';
import styles from './switch-profile.module.css';

export const SwitchProfile = () => {

  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();

  const renderUserInfo = () => {
    if (state.data) {
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

  console.log(state)
  return (
    <div className={styles.section}>
      <button onClick={_ => dispatch({ type: 'success', results: getUser(0) })}>Студент  №1</button>
      <button onClick={_ => dispatch({ type: 'success', results: getUser(1) })}>Студент  №2</button>
      <button onClick={_ => dispatch({ type: 'success', results: getUser(2) })}>Куратор</button>
      <button onClick={resetHandler}>reset</button>
      {renderUserInfo()}
    </div >
  );
}
