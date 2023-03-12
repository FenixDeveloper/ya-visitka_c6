import { FC } from 'react';
import styles from './admin-panel.module.css';
import { Link } from 'react-router-dom';

type TCellProps = {
  value: string | number,
  loaded?: boolean,
  type: string,
  onChange?: React.ChangeEventHandler;
  id?: number;
}

export const TableCell: FC<TCellProps>  = ({ value, loaded, type, onChange, id }) => {

  return (
    <div className={styles.table_cell}>
    { type === 'link' && 
      <Link className={`${styles.text}` + ` ${styles.text_dark}`} to={`/vizitka/${id}`}>{value}</Link>
    }
    { type === 'common' &&
      <p className={`${styles.text}` + ` ${styles.text_dark}`}>{value}</p>
    }
    { type === 'header' &&
      <p className={`${styles.text}` + ` ${styles.text_placeholder}`}>{value}</p>
    }
    { type === 'input' &&
      <input
        type='text'
        value={value}
        onChange={onChange}
        className={`${styles.text}` + ` ${styles.table_input}` + 
        ( loaded ?  ` ${styles.text_blue}` : ` ${styles.text_dark}` )}
      />
    }
    </div>
  );
};