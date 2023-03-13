import { FC, useState, ChangeEvent } from 'react';
import { TableCell } from './table-cell';
import { IUser } from '../../utils/types';
import styles from './admin-panel.module.css';
import { putUser } from '../../utils/api';

type TRowProps = {
  data: IUser,
  loaded?: boolean,
  onDelete?: (e: React.MouseEvent, index: number) => void,
  index?: number;
  userUpdate?: (value: string, index: number, data: IUser, type: string) => void, 
}

export const TableUsersRow: FC<TRowProps> = ({data, loaded, onDelete, index, userUpdate}) => {
  const [stateCohort, setStateCohort] = useState(data.cohort);
  const [stateEmail, setStateEmail] = useState(data.email);
  const [stateName, setStateName] = useState(data.name);
  const [stateData, setStateData] = useState(data);
  const type = loaded ? 'input' : (stateData.name && stateData._id) ? 'link' : 'common'
  const name = stateData.name ? stateData.name : ''

  const changeUser = (cohort: string, email: string) => {
    if (stateData._id) {
      putUser({cohort, email}, stateData._id).then((res) => {
        setStateData(res)
        if (cohort === 'deleted') setStateCohort('deleted')
      });
    }
  };

  if (userUpdate && onDelete && index !== undefined) {
    return (
      <div className={styles.table_row}>
        <TableCell
          value={stateCohort}
          loaded={loaded}
          type={'input'}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            userUpdate(evt.target.value, index, stateData, 'cohort');
            setStateCohort(evt.target.value);
          }}
        />
        <TableCell
          value={stateEmail}
          loaded={loaded}
          type={'input'}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            userUpdate(evt.target.value, index, stateData, 'email');
            setStateEmail(evt.target.value);
          }}
        />
        <TableCell 
          value={name} 
          loaded={loaded} 
          type={type}
        />
        <button type='button' className={styles.button_delete} onClick={(e: React.MouseEvent) => onDelete(e, index)}></button>
      </div>
    );
  }
  return (
    <div className={styles.table_row}>
      <TableCell
        value={stateCohort}
        loaded={loaded}
        type={'input'}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setStateCohort(evt.target.value);
        }}
      />
      <TableCell
        value={stateEmail}
        loaded={loaded}
        type={'input'}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setStateEmail(evt.target.value);
        }}
      />
      <TableCell 
        value={name} 
        loaded={loaded} 
        type={type}
        id={data._id}
      />
      {stateEmail !== stateData.email ? (
        <button type='button' className={styles.button_save} onClick={(e: React.MouseEvent) => changeUser(stateCohort, stateEmail)}></button>
      ) : (stateCohort !== stateData.cohort) ? (
        <button type='button' className={styles.button_save} onClick={(e: React.MouseEvent) => changeUser(stateCohort, stateEmail)}></button>
      ) : (
        <button type='button' className={styles.button_delete} onClick={(e: React.MouseEvent) => changeUser('deleted', stateEmail)}></button>
      )}
    </div>
  );
  
};