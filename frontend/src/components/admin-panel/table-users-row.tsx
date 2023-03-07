import { FC } from 'react';
import { TableCell } from './table-cell';
import { IUser } from '../../utils/types';
import styles from './admin-panel.module.css';

type TRowProps = {
  data: IUser,
  loaded?: boolean,
  onDelete?: (e: React.MouseEvent, index: number) => void,
  index?: number
}

export const TableUsersRow: FC<TRowProps> = ({data, loaded, onDelete, index}) => {
  console.log(index);
  const type = loaded ? 'input' : 'common'
  
  if (onDelete && index !== undefined) {
    return (
      <div className={styles.table_row}>
        <TableCell value={data.cohort} loaded={loaded} type={'input'}/>
        <TableCell value={data.email} loaded={loaded} type={'input'}/>
        <TableCell value={data.name} loaded={loaded} type={type}/>
        <button type='button' className={styles.button_delete} onClick={(e: React.MouseEvent) => onDelete(e, index)}></button>
      </div>
    );
  }
  return (
    <div className={styles.table_row}>
      <TableCell value={data.cohort} loaded={loaded} type={'input'}/>
      <TableCell value={data.email} loaded={loaded} type={'input'}/>
      <TableCell value={data.name} loaded={loaded} type={type}/>
      <button type='button' className={styles.button_delete}></button>
    </div>
  );
  
};