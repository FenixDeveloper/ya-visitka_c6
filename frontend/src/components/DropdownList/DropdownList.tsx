import { FC, useState } from "react";
import styles from "./DropdownList.module.css";
import arrow from "../../images/icons/arrow.svg";
import { IDropdownList } from "../../utils/types";

// Стилизованный выпадающий список, доделать скролл (как в макете)
export const DropdownList: FC<IDropdownList> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      className={`${styles.select} ${open && styles.select_open}`}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <span className={styles.title}>{props.title}</span>
      <img
        src={arrow}
        className={`${styles.arrow} ${open && styles.arrow_open} `}
        alt="Стрелка выпадающего списка"
      />
      {open && (
        <ul className={styles.menu}>
          {props.data.map((item, index) => (
            <li className={styles.option} key={index}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownList;
