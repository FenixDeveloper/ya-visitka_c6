import { FC, useState } from "react";
import styles from "./vizitka-about-block.module.css";
import { IVizitkaAboutBlock, VizitkaStyle } from "../../utils/types";
import icon from "../../images/icons/comment.svg";
import romantic from './romantic.svg'
import derzkiy from './derzkiy.svg'
import { emojies } from "../../utils/constants";
import CommentPost from '../comment-post/comment-post';

const VizitkaAboutBlock: FC<IVizitkaAboutBlock> = (props) => {
  const [openComment, setOpenComment] = useState<boolean>(false);
  return (
    <div className={`${styles.hobbyBlock} ${props.style === VizitkaStyle.Base ? styles.border : ''}`}>
      {props.style !== VizitkaStyle.Base ? <img src={props.style === VizitkaStyle.Romantic ? romantic : derzkiy} alt='Граница блока'/> : ''}
      <div className={styles.flexWrapper}>
        <p className={styles.aboutBlockTitle}>{props.title}</p>
          <div className={styles.quotes_comments_block} onClick={() => { setOpenComment(!openComment) }}>
            {props.comments_number !== 0 && (
              <div className={`${styles.comments_number_block} ${openComment ? styles.showComments : ''}`}>{props.comments_number}</div>
            )}
            <img src={icon} className={`${styles.icon_block} ${openComment ? styles.showComments : ''}`} alt="Иконка комментариев" />
          </div>
          {openComment && (
            <div className={styles.comment}>
              <CommentPost
                comments={['Комментарий 1', 'Комментарий 2', 'Комментарий 3', 'Комментарий 4', 'Комментарий 4', 'Комментарий 4','Комментарий 4', 'Комментарий 4']}
                emojies={emojies}
                class={false}
              />
            </div>
          )}
      </div>
      {props.img ? <img className = {styles.img} src={props.img} alt={`Фото ${props.title}`} /> : ''}
      <p className={styles.aboutBlockText}>{props.description}</p>
    </div>
)}
export default VizitkaAboutBlock;