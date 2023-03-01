import { useState, ChangeEvent } from 'react';
import { SwitchPage } from '../../components/admin-panel/switch-page';
import { SearchBar } from '../../components/admin-panel/search-bar';
import { TableCommentsRow } from '../../components/admin-panel/table-comments-row';
import { TableCell } from '../../components/admin-panel/table-cell';
import { IComment } from '../../utils/types'; 
import styles from './admin.module.css';

export const Admin = () => {

  const [inputValue, setInputValue] = useState('');

  const data = [
    {   
        _id: 123,
        cohort: 1853,
        createdAt: '20.12.2022',
        sender: 'Дмитрий Степанов',
        recipient: 'Виктория Листвина',
        block: 'Из блока увлечения',
        text: 'Классные у тебя увлечения, я тоже играю в настолки, любимая игра — Эволюция. Люблю еще слушать музыку, ходить в кино, общаться с друзьями. Ну и учиться в Практикуме. ',
    },
  ];
  return (
      <section className={styles.main}>
        <SwitchPage />
        <SearchBar 
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
          { data
            .filter((el) =>
              el.sender.includes(inputValue as string) || el.recipient.includes(inputValue as string)
            )
            .map((value: IComment) => (
              <TableCommentsRow data={value} key={Math.random()*100}/>
            ))}
        </div>
      </section>
  );
};