import { FC } from 'react';
import styles from './admin-panel.module.css';

type TSearchProps = {
  onChange: React.ChangeEventHandler;
  value: string;
}

export const SearchBar: FC<TSearchProps>  = ({onChange, value}) => {

  return (
    <label className={styles.search}>
      <p className={`${styles.text}` + ` ${styles.text_dark}`}>Фильтровать</p>
      <input
          type='search'
          className={styles.input}
          value={value}
          onChange={onChange}
          placeholder='По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)'
        />
    </label>
  );
};