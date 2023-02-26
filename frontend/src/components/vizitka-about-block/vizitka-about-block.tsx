import { FC } from "react";
import styles from "./vizitka-about-block.module.css";
import { IVizitkaAboutBlock, VizitkaStyle } from "../../utils/types";
import icon from "../../images/icons/comment.svg";
import romantic from './romantic.svg'
import derzkiy from './derzkiy.svg'

const VizitkaAboutBlock: FC<IVizitkaAboutBlock> = (props) => {
  return (
    <div className={`${styles.hobbyBlock} ${props.style === VizitkaStyle.Base ? styles.border : ''}`}>
      {props.style !== VizitkaStyle.Base ? <img src={props.style === VizitkaStyle.Romantic ? romantic : derzkiy} alt='Граница блока'/> : ''}
      <div className={styles.flexWrapper}>
        <p className={styles.aboutBlockTitle}>{props.title}</p>
          <div className={styles.quotes_comments_block}>
            {props.comments_number !== 0 && (
              <div className={styles.comments_number_block}>{props.comments_number}</div>
            )}
            <img src={icon} className={styles.icon_block} alt="Иконка комментариев" />
          </div>
      </div>
      {props.img ? <img className = {styles.img} src={props.img} alt={`Фото ${props.title}`} /> : ''}
      <p className={styles.aboutBlockText}>{props.description}</p>
    </div>
)}
export default VizitkaAboutBlock;