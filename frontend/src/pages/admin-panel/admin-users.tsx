import { useState, ChangeEvent, useEffect } from 'react';
import { read, utils } from 'xlsx';
import { SwitchPage } from '../../components/admin-panel/switch-page';
import { SearchBar } from '../../components/admin-panel/search-bar';
import { TableUsersRow } from '../../components/admin-panel/table-users-row';
import { TableCell } from '../../components/admin-panel/table-cell';
import { IUser } from '../../utils/types'; 
import styles from './admin.module.css';

const data = [  
  {
      cohort: 1853,
      email: "mail@gmail.com",
      name: "Сергей Иванов",
  },
  {
      cohort: 1853,
      email: "dmitriystepanov@gmail.com",
      name: "Дмитрий Степанов",
  },
];

export const AdminUsers = () => {

  const [inputValue, setInputValue] = useState<string | number>('');
  const [loadedData, SetLoadedData] = useState<IUser[] | []>([]);

  useEffect(() => {

  }, []);

  const handleFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
		reader.onload = (e: any) => {
			const ab = e.target.result;
			const wb = read(ab, {type:'array'});
			const ws = wb.Sheets[wb.SheetNames[0]];
			const data = utils.sheet_to_json<IUser>(ws, {header:['cohort','email','name']});
			SetLoadedData(data);
		};
  }

  const handleUpload = (evt: ChangeEvent<HTMLInputElement>) => {
		const files = evt.target.files;
		if(files && files[0]) handleFile(files[0]);
	};

  const createUsers = () => {
  } 

  return (
      <section className={styles.main}> 
        <SwitchPage />
        <div className={styles.columns}>
          <div className={styles.first_column}>
            <SearchBar 
               onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setInputValue(evt.target.value);
              }}
            />
            <div className={styles.table_row}>
              <TableCell value={'Номер когорты'} type={'header'} />
              <TableCell value={'E-mail'} type={'header'} />
              <TableCell value={'Имя и фамилия студента'} type={'header'} />
            </div>
            <div className={styles.table}>
              { loadedData.length > 0 && loadedData
                .filter((el) =>
                  (el.name || '').includes(inputValue as string) 
                  || (el.email || '').includes(inputValue as string)
                )
                .map((value: IUser) => (
                  <TableUsersRow data={value} loaded={true} key={Math.random()*100}/>
                ))}
              { data.length > 0 && data 
                .filter((el) =>
                  el.name.includes(inputValue as string) || el.email.includes(inputValue as string)
                )
                .map((value: IUser) => (
                  <TableUsersRow data={value} key={Math.random()*100}/>
                ))}
            </div>
          </div>
          <div className={styles.second_column}>
            <p className={`${styles.text_title}` + ` ${styles.text_dark}`}>Добавить студентов</p>
            <p className={`${styles.text}` + ` ${styles.text_dark}`}>Чтобы добавить новых студентов, 
              загрузите csv или xlsx файл: первая колонка должна содержать email студентов, вторая колонка — номер когорты.
            </p>
            <label className={styles.upload}> 
              <p className={styles.upload_text}>Выберите файл</p>
              <input type='file' hidden onChange={(e) => handleUpload(e)}/>
            </label>
            { loadedData.length > 0 &&
              <>
                <p className={`${styles.text}` + ` ${styles.text_dark}`}>Проверьте, что загруженные данные корректны и сохраните их или удалите и загрузите заново.
                </p>
                <div className={styles.columns}>
                  <button className={`${styles.button}` + ` ${styles.button_delete}`} onClick={() => SetLoadedData([])}>Удалить</button>
                  <button className={`${styles.button}` + ` ${styles.button_save}`} onClick={() => createUsers()}>Сохранить</button>
                </div>
              </>
            }
          </div>
        </div>
        
      </section>
  );
};