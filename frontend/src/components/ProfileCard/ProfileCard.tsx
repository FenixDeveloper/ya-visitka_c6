import { FC } from "react";
import styles from "./ProfileCard.module.css";
import { IProfileCard } from "../../utils/types";
import icon from "../../images/icons/comment.svg";

const ProfileCard: FC<IProfileCard> = (props) => {
  return (
    <li className={styles.card} key={props.key}>
      <img src={props.image} className={styles.image} alt="Фото человека" />
      {props.comments_number != 0 && (
        <div className={styles.comments_number}>{props.comments_number}</div>
      )}
      <img src={icon} className={styles.icon} alt="Иконка комментариев" />

      <p className={styles.name}>{props.name}</p>
      <p className={styles.city}>{props.city}</p>
    </li>
  );
};
export default ProfileCard;
