import { FC } from 'react';
import { TableCell } from './table-cell';
import { IUser } from '../../utils/types';
import styles from './admin-panel.module.css';

type TRowProps = {
  data: IUser,
  loaded?: boolean,
}

export const TableUsersRow: FC<TRowProps> = ({data, loaded}) => {
  
  const type = loaded ? 'input' : 'common'
  
  return (
    <div className={styles.table_row}>
      <TableCell value={data.cohort} loaded={loaded} type={'input'}/>
      <TableCell value={data.email} loaded={loaded} type={'input'}/>
      <TableCell value={data.name} loaded={loaded} type={type}/>
    </div>
  );
};