import { ChangeEvent, FC, RefObject } from 'react';
import styles from './graidentButton.module.css';
import env from "react-dotenv";

interface IGraidentButton {
  type: 'submit' | 'file' | 'href';
  text: string;
  handlerClick?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputFileRef?: RefObject<HTMLInputElement>;
  disabled?: boolean
}
export const GraidentButton: FC<IGraidentButton> = ({
  type,
  text,
  handlerClick,
  onChange,
  inputFileRef,
  disabled
}) => {

  const url = env.CALLBACK_URL;
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
            <a className={styles.text} href={`https://oauth.yandex.com/authorize?response_type=code&client_id=0cdebeaa249342658d6f8a1f5eb5eb3e&redirect_uri=${url}`}>
             {text}
          </a>
          </button>
        </>
      ) : (
        <input
          className={`${styles.input} ${styles.large}`}
          type={type}
          value={text}
          disabled={disabled ?? false}
          onClick={handlerClick}
        />
      )}
    </label>
  );
};
