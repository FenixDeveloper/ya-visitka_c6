import { useState, FC } from 'react';
import styles from './admin-panel.module.css';

type TCellProps = {
  value: string | number,
  loaded?: boolean,
  type: string,
}

export const TableCell: FC<TCellProps>  = ({ value, loaded, type }) => {

  const [state, setState] = useState(value);

  return (
    <div className={styles.table_cell}>
    { type === 'common' &&
      <p className={`${styles.text}` + ` ${styles.text_dark}`}>{value}</p>
    }
    { type === 'header' &&
      <p className={`${styles.text}` + ` ${styles.text_placeholder}`}>{value}</p>
    }
    { type === 'input' &&
      <input
        type='text'
        value={state}
        onChange={({ target }) => setState(target.value)}
        className={`${styles.text}` + ` ${styles.table_input}` + 
        ( loaded ?  ` ${styles.text_blue}` : ` ${styles.text_dark}` )}
      />
    }
    </div>
  );
};