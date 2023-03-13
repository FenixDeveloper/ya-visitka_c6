import { FormEvent, useState } from 'react';
import styles from './comment-post.module.css';

interface CommentPostProps {
  comments: string[];
  emojies: { type: string; name: string; count: number }[];
  class?: boolean;
}

function CommentPost(props: CommentPostProps) {
  const { comments, emojies } = props;
  const [input, setInput] = useState('');

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setInput('');
  };

  return (
    <div className={!props.class ? styles.container : styles.container_modifed}>
      <div className={styles.commentWrap}>
        {comments.map((item, index) => (
          <p key={index} className={styles.commentText}>
            {item}
          </p>
        ))}
      </div>
      <form className={styles.commentForm} onSubmit={submitHandler}>
        <input
          className={styles.inputForm}
          placeholder="Обратная связь"
          value={input}
          onChange={(evt) => setInput(evt.target.value)}
        />
        <div className={styles.emojiWrap}>
          {emojies.map((item, index) => (
            <button
              key={index}
              className={styles.emojiBtn}
              type="button"
              onClick={() => setInput(input + item.type)}
            >
              {item.type}
              {item.count > 0 && (
                <span className={styles.emojiCount}>
                  {item.count > 99 ? '99+' : item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}

export default CommentPost;
