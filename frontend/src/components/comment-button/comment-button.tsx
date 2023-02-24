import { MutableRefObject } from 'react';
import styles from './comment-button.module.css';

interface CommentButtonProps {
  commentCount: number;
  viewed: boolean;
  handleOpenComment: () => void;
  commentBtnRef: MutableRefObject<null>;
}

function CommentButton(props: CommentButtonProps) {
  const { commentCount, viewed, handleOpenComment, commentBtnRef } = props;
  const countStyle = {
    padding: commentCount > 99 ? '0 5px' : '0',
    backgroundColor: viewed ? '#100c34' : '#ff00a8',
  };

  return (
    <button
      className={styles.button}
      type="button"
      onClick={handleOpenComment}
      ref={commentBtnRef}
    >
      {commentCount > 0 && (
        <p className={styles.count} style={countStyle}>
          {commentCount}
        </p>
      )}
    </button>
  );
}

export default CommentButton;
