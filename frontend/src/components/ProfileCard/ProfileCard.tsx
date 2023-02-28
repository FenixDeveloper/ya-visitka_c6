import { FC, useState } from 'react';
import styles from './ProfileCard.module.css';
import { IProfileCard } from '../../utils/types';
import icon from '../../images/icons/comment.svg';
import CommentPost from '../comment-post/comment-post';
import { Link } from 'react-router-dom';

const ProfileCard: FC<IProfileCard> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <li className={styles.card}>
      <Link className={styles.link} to={'/vizitka'}>
      <img
        src={props.image}
        className={!open ? styles.image : styles.image_open}
        alt="Фото человека"
      />
            </Link>
      <div
      className={styles.icon__comment}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {props.comments_number !== 0 && (
          <div
            className={
              open ? styles.comments_number_open : styles.comments_number
           }
          >
            {props.comments_number}
          </div>
        )}
        <img src={icon} className={open ? styles.icon_open : styles.icon} alt="Иконка комментариев" />
      </div>
      {open && (
        <div className={styles.comment}>
          <CommentPost
            comments={['Классная фотка', 'Очень инетерсно', 'Комментарий 1', 'Комментарий 2', 'Комментарий 3', 'Комментарий 4', 'Комментарий 4', 'Комментарий 4' ,'Комментарий 4' ,'Комментарий 4']}
            emojies={[{ type: '', count: 3 }]}
            class={true}
          />
        </div>
      )}
      <p
        className={`${styles.name} ${
          !open ? styles.name_close : styles.name_open
        }`}
      >
        {props.name}
      </p>
      <p className={styles.city}>{props.city}</p>

    </li>
  );
};
export default ProfileCard;
