import { FC, useState } from "react";
import styles from "./DropdownList.module.css";
import arrow from "../../images/icons/arrow.svg";
import { IDropdownList } from "../../utils/types";
import { ErrorMessage } from "../errorMessage/errorMessage";

// Стилизованный выпадающий список, доделать скролл (как в макете)
export const DropdownList: FC<IDropdownList> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handlerClick = (index: number) => {
    props.setState(props.data[index])
    props.setStateError && props.setStateError(!props.data[index])
  }

  return (
    <div className={styles.dropdownList}>
      {props.title && !props.requiredField && <p className={styles.text}>{props.title}</p>}
      {props.title && props.requiredField && <p className={styles.text}>{props.title}<span>*</span></p>}
      <div
        className={`${styles.select} ${open && styles.select_open}`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span className={styles.title}>{props.state}</span>
        <img
          src={arrow}
          className={`${styles.arrow} ${open && styles.arrow_open} `}
          alt="Стрелка выпадающего списка"
        />
        {open && (
          <ul className={styles.menu}>
            {props.data.map((item, index) => (
              <li className={styles.option} key={index} onClick={() => handlerClick(index)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
      {props.requiredField && props.stateError && <ErrorMessage>Поле обязательно для заполнения</ErrorMessage>}
    </div>
  );
};

export default DropdownList;
