import { FC, useState, ChangeEvent } from 'react';
import { TableCell } from './table-cell';
import { IUser } from '../../utils/types';
import styles from './admin-panel.module.css';
import { putUser } from '../../utils/api';

type TRowProps = {
  data: IUser,
  loaded?: boolean,
  onDelete?: (e: React.MouseEvent, index: number) => void,
  index?: number
}

export const TableUsersRow: FC<TRowProps> = ({data, loaded, onDelete, index}) => {
  const type = loaded ? 'input' : 'common'
  const name = data.name ? data.name : ''
  const [stateCohort, setStateCohort] = useState(data.cohort);
  const [stateName, setStateName] = useState(data.name);
  const [stateEmail, setStateEmail] = useState(data.email);

  const changeUser = (cohort: string, email: string) => {
    console.log({cohort, email})
    //if (data._id) putUser({cohort, email}, data._id)
  };

  if (onDelete && index !== undefined) {
    return (
      <div className={styles.table_row}>
        <TableCell value={data.cohort} loaded={loaded} type={'input'}/>
        <TableCell value={data.email} loaded={loaded} type={'input'}/>
        <TableCell value={name} loaded={loaded} type={type}/>
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
      />
      {stateEmail !== data.email ? (
        <button type='button' className={styles.button_save} onClick={(e: React.MouseEvent) => changeUser(stateCohort, stateEmail)}></button>
      ) : (stateCohort !== data.cohort) ? (
        <button type='button' className={styles.button_save} onClick={(e: React.MouseEvent) => changeUser(stateCohort, stateEmail)}></button>
      ) : (
        <button type='button' className={styles.button_delete} onClick={(e: React.MouseEvent) => changeUser('deleted', stateEmail)}></button>
      )}
    </div>
  );
  
};