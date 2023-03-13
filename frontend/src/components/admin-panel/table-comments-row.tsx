import { FC } from 'react';
import { TableCell } from './table-cell';
import { IComment } from '../../utils/types';
import styles from './admin-panel.module.css';

type TRowProps = {
  data: IComment,
  onDelete: (index: number, id: number) => void,
  index: number;
}

export const TableCommentsRow: FC<TRowProps> = ({data, onDelete, index}) => {
  
  return (
    <div className={styles.table_row_comments}>
      <TableCell value={data.cohort} type={'common'}/>
      <TableCell value={data.createdAt} type={'common'}/>
      <TableCell value={data.sender} type={'common'}/>
      <TableCell value={data.recipient} type={'common'}/>
      <TableCell value={data.block} type={'common'}/>
      <TableCell value={data.text} type={'common'}/>
      <button type='button' className={styles.button_delete} onClick={(e: React.MouseEvent) => onDelete(index, data._id)}></button>
    </div>
  );
};