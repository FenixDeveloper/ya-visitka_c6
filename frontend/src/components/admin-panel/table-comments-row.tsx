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

  const sender = data.from.name ? data.from.name : ''
  const recent = data.to.name ? data.to.name : ''
  const createdAt = data.createdAt.substring(0, 10);
  const id = 1;
  let target;
  switch (data.target) {
    case 'hobby':
      target = 'из блока Увлечения'; 
      break;
    case 'status':
      target = 'из блока Семья'; 
      break;
    case 'job':
      target = 'из блока Работа';
      break;
    case 'edu':
      target = 'из блока Образования'; 
      break;
    case 'quote':
      target = 'из блока Цитаты'; 
      break;
    default:
      target = 'из визитки'; 
  }
  
  return (
    <div className={styles.table_row_comments}>
      <TableCell value={data.from.cohort} type={'common'}/>
      <TableCell value={createdAt} type={'common'}/>
      <TableCell value={sender} type={'common'}/>
      <TableCell value={recent} type={'common'}/>
      <TableCell value={target} type={'common'}/>
      <TableCell value={data.text} type={'common'}/>
      <button type='button' className={styles.button_delete} onClick={(e: React.MouseEvent) => onDelete(index, id)}></button>
    </div>
  );
};