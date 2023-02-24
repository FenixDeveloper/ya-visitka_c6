import styles from './comment-button.module.css';

interface CommentButtonProps {
  commentCount: number;
  viewed: boolean;
}

function CommentButton(props: CommentButtonProps) {
  const { commentCount, viewed } = props;
  const countStyle = {
    padding: commentCount > 99 ? '0 5px' : '0',
    backgroundColor: viewed ? "#100c34" : "#ff00a8",
  }

  return (
    <button className={styles.button} type="button">
      {commentCount > 0 && (
        <p
          className={styles.count}
          style={countStyle}
        >
          {commentCount}
        </p>
      )}
    </button>
  );
}

export default CommentButton;
