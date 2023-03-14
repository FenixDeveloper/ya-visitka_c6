import { useState, ChangeEvent, useEffect } from 'react';
import { SwitchPage } from '../../components/admin-panel/switch-page';
import { SearchBar } from '../../components/admin-panel/search-bar';
import { TableCommentsRow } from '../../components/admin-panel/table-comments-row';
import { TableCell } from '../../components/admin-panel/table-cell';
import { IComment } from '../../utils/types'; 
import { getComments } from '../../utils/api';
import { v4 as uuidv4 } from 'uuid';
import styles from './admin.module.css';
import { deleteComment } from '../../utils/api';

export const Admin = () => {

  const [inputValue, setInputValue] = useState('');
  const [dataComments, setDataComments] = useState<IComment[] | []>([]);

  useEffect(() => {
    getComments().then((res) => {
      console.log(res)
      setDataComments(res.items);
    });
  }, []);

  const handleDeleteComment = (index: number, id: number): void => {
    deleteComment(id).then((res) => {
      setDataComments(
        dataComments.filter(
          (element: IComment, indexElement: number) => indexElement !== index,
        ),
      );
    });
    
  };

  return (
      <section className={styles.main}>
        <SwitchPage />
        <SearchBar
          value={inputValue} 
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setInputValue(evt.target.value);
          }}
        />
        <div className={styles.table_row_comments}>
          <TableCell value={'Когорта'} type={'header'} />
          <TableCell value={'Дата'} type={'header'} />
          <TableCell value={'Отправитель'} type={'header'} />
          <TableCell value={'Получатель'} type={'header'} />
          <TableCell value={'Откуда комментарий'} type={'header'} />
          <TableCell value={'Текст комментария'} type={'header'} />
        </div>
        <div className={styles.table}>
          { dataComments
            .filter((el) =>
              el.from.name?.includes(inputValue as string) ||
              el.to.name?.includes(inputValue as string) ||
              el.from.cohort?.includes(inputValue as string)
            )
            .map((value: IComment, index: number) => (
              <TableCommentsRow
                data={value}
                key={uuidv4()}
                onDelete={handleDeleteComment}
                index={index}
                />
            ))}
        </div>
      </section>
  );
};