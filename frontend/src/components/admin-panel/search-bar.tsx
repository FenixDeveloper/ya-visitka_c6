import { FC } from 'react';
import styles from './admin-panel.module.css';

type TSearchProps = {
  state: string;
  onChange: React.ChangeEventHandler;
}

export const SearchBar: FC<TSearchProps>  = ({
  state,
  onChange
}) => {

  return (
    <label className={styles.search}>
      <p className={`${styles.text} ${styles.text_dark}`}>Фильтровать</p>
      <input
          type='search'
          value={state}
          className={styles.input}
          onChange={onChange}
          placeholder='По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)'
        />
    </label>
  );
};