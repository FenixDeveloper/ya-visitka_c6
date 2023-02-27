import { FC } from 'react';
import styles from './admin-panel.module.css';

type TSearchProps = {
  onChange: React.ChangeEventHandler;
}

export const SearchBar: FC<TSearchProps>  = ({onChange}) => {

  return (
    <div className={styles.search}>
      <label className={styles.text + styles.text_dark}>
        Фильтровать
        
      </label>
      <input
          type='search'
          className={styles.input}
          onChange={onChange}
          placeholder='По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)'
        />
    </div>
  );
};