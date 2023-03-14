import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { read, utils } from 'xlsx';
import { SwitchPage } from '../../components/admin-panel/switch-page';
import { SearchBar } from '../../components/admin-panel/search-bar';
import { TableUsersRow } from '../../components/admin-panel/table-users-row';
import { TableCell } from '../../components/admin-panel/table-cell';
import { IUser } from '../../utils/types';
import { getUsers, postUser } from '../../utils/api';
import styles from './admin.module.css';
import { v4 as uuidv4 } from 'uuid';
import { GraidentButton } from '../../components/graidentButton/graidentButton';

export const AdminUsers = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [loadedData, SetLoadedData] = useState<IUser[] | []>([]);
  const [dataUsers, setDataUsers] = useState<IUser[] | []>([]);
  const loadedFileRef = useRef<any>(null);

  useEffect(() => {
    getUsers('').then((res) => {
      setDataUsers(res.items);
    });
  }, []);

  const handleFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e: any) => {
      const ab = e.target.result;
      const wb = read(ab, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = utils.sheet_to_json<IUser>(ws, {
        header: ['cohort', 'email', 'name'],
      });
      SetLoadedData(data);
    };
  };

  const handleUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    if (files && files[0]) handleFile(files[0]);
  };

  const handleDeleteFile = () => {
    SetLoadedData([]);
    loadedFileRef.current.value = null;
  };

  const handleDeleteUser = (e: React.MouseEvent, index: number): void => {
    e.preventDefault(); 
    if (loadedData.length === 1) {
      loadedFileRef.current.value = null;
    }
    SetLoadedData(
        loadedData.filter(
          (element: IUser, indexElement: number) => indexElement !== index,
        ),
      );
  };

  const handleUpdateUser = (value: string, index: number, data: IUser, type: string): void => {
    if (type === 'cohort') {
      data.cohort = value
    }
    if (type === 'email') {
      data.email = value
    }
    loadedData[index] = data;
    SetLoadedData(loadedData);
  };

  const createUsers = () => {
    loadedData.forEach((element: IUser, index: number) => {
      const email = element.email;
      const cohort = element.cohort;
      postUser({cohort, email }).then((res) => {
        const newData = [...dataUsers, res]
        setDataUsers(newData)
        SetLoadedData(
          loadedData.filter(
            (element: IUser, indexElement: number) => indexElement !== index,
          ),
        );
      });
    });
  };

  return (
    <section className={styles.main}>
      <SwitchPage />
      <div className={styles.columns}>
        <div className={styles.first_column}>
          <SearchBar
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setInputValue(evt.target.value);
            }}
            value={inputValue}

          />
          <div className={styles.table_row}>
            <TableCell value={'Номер когорты'} type={'header'} />
            <TableCell value={'E-mail'} type={'header'} />
            <TableCell value={'Имя и фамилия студента'} type={'header'} />
          </div>
          <div className={styles.table}>
            {loadedData.length > 0 &&
              loadedData
                .filter(
                  (el) =>
                    el.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
                    el.email?.toLowerCase().includes(inputValue.toLowerCase()) ||
                    el.cohort?.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((value: IUser, index: number) => (
                  <TableUsersRow
                    data={value}
                    loaded={true}
                    key={uuidv4()}
                    onDelete={handleDeleteUser}
                    userUpdate={handleUpdateUser}
                    index={index}
                  />
                ))}
            {dataUsers.length > 0 &&
              dataUsers
                .filter(
                  (el) =>
                    el.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
                    el.email.toLowerCase().includes(inputValue.toLowerCase()) ||
                    el.cohort.toLowerCase().includes(inputValue.toLowerCase())
                )
                .sort((el1: IUser, el2: IUser) => el1.updatedAt > el2.updatedAt ? 1 : -1)
                .map((value: IUser, index: number) => (
                  <TableUsersRow 
                    data={value}
                    key={uuidv4()}
                    index={index}
                  />
                ))}
          </div>
        </div>
        <div className={styles.second_column}>
          <p className={`${styles.text_title} ${styles.text_dark}`}>
            Добавить студентов
          </p>
          <p className={`${styles.text} ${styles.text_dark}`}>
            Чтобы добавить новых студентов, загрузите csv или xlsx файл: первая
            колонка должна содержать email студентов, вторая колонка — номер
            когорты.
          </p>
          <div className={styles.wrapper_gradient_button}>
            <GraidentButton
              type={'file'}
              text={'Выберите файл'}
              onChange={handleUpload}
              inputFileRef={loadedFileRef}
            />
          </div>
          {loadedData.length > 0 && (
            <>
              <p className={`${styles.text} ${styles.text_dark}`}>
                Проверьте, что загруженные данные корректны и сохраните их или
                удалите и загрузите заново.
              </p>
              <div className={styles.columns}>
                <button
                  className={`${styles.button} ${styles.button_delete}`}
                  onClick={handleDeleteFile}
                >
                  Удалить
                </button>
                <button
                  className={`${styles.button} ${styles.button_save}`}
                  onClick={() => createUsers()}
                >
                  Сохранить
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
