import { ChangeEvent, FC, RefObject } from 'react';
import { Link } from "react-router-dom";
import styles from './graidentButton.module.css';

interface IGraidentButton {
  type: 'submit' | 'button' | 'file' | 'href';
  text: string;
  handlerClick?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputFileRef?: RefObject<HTMLInputElement>;
}
export const GraidentButton: FC<IGraidentButton> = ({
  type,
  text,
  handlerClick,
  onChange,
  inputFileRef,
}) => {
  return (
    <label>
      {type === 'file' ? (
        <>
          <input type="file" onChange={onChange} ref={inputFileRef} />
          <div className={`${styles.input} ${styles.small}`}>
            <p>{text}</p>
          </div>
        </>
      ) : type === 'href' ? (
        <>
        <button className={`${styles.input} ${styles.large}`}>
          {/* <a className={styles.text} href="https://oauth.yandex.com/authorize?response_type=code&client_id=0cdebeaa249342658d6f8a1f5eb5eb3e">
             {text}
          </a> */}
          <Link className={styles.text} to='/switch-profile'>
          {text}
          </Link>
        </button>
        </>
      ) : (
        <input
          className={`${styles.input} ${styles.large}`}
          type={type}
          value={text}
          onClick={handlerClick}
        />
      )}
    </label>
  );
};
