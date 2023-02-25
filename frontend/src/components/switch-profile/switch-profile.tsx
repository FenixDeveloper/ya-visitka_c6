import { AppContext } from '../../utils/AppContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useResize } from '../../hooks/use-resize';
import { comments, emojies, getUser, reset } from '../../mockApi';
import CommentButton from '../comment-button/comment-button';
import CommentPost from '../comment-post/comment-post';
import Tooltip from '../tooltip/tooltip';
// import { getUser, reset } from '../../mockApi';

import styles from './switch-profile.module.css';

export const SwitchProfile = () => {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();

  const renderUserInfo = () => {
    if (state.data) {
      console.log(state.data);
      const userInfo = state.data;
      return (
        <>
          <p>{userInfo.name}</p>
          <p>{userInfo.email}</p>
          <img src={userInfo.photo || ''} alt="avatar" />
          <p>{userInfo.role}</p>
        </>
      );
    } else {
      return null;
    }
  };
  const resetHandler = () => {
    dispatch({ type: 'success', results: reset() });
    history.push('/login');
  };

  console.log(state);

  // Начало блока CommentPost
  // Переменные для всплывающего окна с комментариями
  const commentBtnRef = useRef(null);
  const [tooptipTop, setTooptipTop] = useState(0);
  const [tooptipLeft, setTooptipLeft] = useState(0);
  const [commentVisible, setCommentVisible] = useState(false);
  const { width } = useResize();

  // Функция открытия окна с комментариями
  const handleOpenComment = () => {
    const current = commentBtnRef.current as HTMLElement | null;

    if (current) {
      setTooptipTop(current.offsetTop + current.offsetHeight);
      setTooptipLeft(current.offsetLeft);
      setCommentVisible(!commentVisible);
    }
  };

  useEffect(() => {
    setCommentVisible(false);
  }, [width]);
  // Конец блока CommentPost

  const setUser = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    dispatch({ type: 'success', results: getUser(id) });
    history.replace({ pathname: "/" });
  }

  return (
    <div className={styles.section}>
      {/* Начало блока CommentPost */}
      <CommentButton
        commentCount={200}
        viewed={false}
        handleOpenComment={handleOpenComment}
        commentBtnRef={commentBtnRef}
      />
      {commentVisible && (
        <Tooltip
          children={<CommentPost comments={comments} emojies={emojies} />}
          offset={{ top: tooptipTop, left: tooptipLeft }}
        />
      )}
      {/* Конец блока CommentPost */}
      
      <button onClick={(e) => setUser(e, 0)}>Студент  №1</button>
      <button onClick={(e) => setUser(e, 1)}>Студент  №2</button>
      <button onClick={(e) => setUser(e, 2)}>Куратор</button>
      <button onClick={resetHandler}>reset</button>
      {renderUserInfo()}
    </div>
  );
};
