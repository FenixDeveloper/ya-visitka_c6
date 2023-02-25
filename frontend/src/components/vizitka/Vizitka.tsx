import { FC } from "react";
import styles from "./Vizitka.module.css";
import { IVizitka } from "../../utils/types";
import telegram_logo from './telegram.svg';
import github_logo from './GitHub.svg';
import quotes_img from './quotes.svg';
import icon from "../../images/icons/comment.svg";
import VizitkaAboutBlock from "../vizitka-about-block/vizitka-about-block";

const Vizitka: FC<IVizitka> = (props) => {
  const blocksTitle = ['Увлечения', 'Семья', 'Cфера', 'Yчеба']
  return (
    <section>
      <ul className={styles.mainBlocks}>
        <li className={styles.nameBlock}>
          <p className={styles.name}>
            {props.name}
          </p>
          <p className={styles.city}>
            {props.city}
          </p>
          <div className={styles.logoBlock}>
            <img src={telegram_logo} alt='Лого telegram' className={styles.logo} />
            <img src={github_logo} alt='Лого GitHun' className={styles.logo} />
          </div>
        </li>
        <li className={styles.imageBlock}>
          {props.photo_comments_number !== 0 && (
            <div className={styles.comments_number}>{props.photo_comments_number}</div>
          )}
          <img src={icon} className={styles.icon} alt="Иконка комментариев" />
          <img src={props.image} alt='Фото персоны' className={styles.image}/>
        </li>
        <li className={styles.quotesBlock}>
          <div className={styles.quotes_comments_block}>
            {props.quotes_comments_number !== 0 && (
              <div className={styles.comments_number_block}>{props.photo_comments_number}</div>
            )}
            <img src={icon} className={styles.icon_block} alt="Иконка комментариев" />
          </div>
          <img src={quotes_img} alt='Изображение кавычек' className={styles.quotesImg} />
          <p className={styles.quotes}>
            {props.quotes}
          </p>
        </li>
      </ul>
       <ul className={styles.blocks}>
        {blocksTitle.map((item, index) => (
          <li className={styles.block}>
            {item === 'Увлечения' ? 
            <VizitkaAboutBlock 
            title = {'Увлечения'}
            comments_number = {props.hobby_comments_number}
            img={props.hobby_img}
            description={props.hobby}
            />
            : ''}
            {item === 'Семья' ? 
            <VizitkaAboutBlock 
            title = {'Семья'}
            comments_number = {props.family_comments_number}
            img={props.family_img}
            description={props.family}
            />
            : ''}
            {item === 'Cфера' ? 
            <VizitkaAboutBlock 
            title = {'Cфера'}
            comments_number = {props.activity_comments_number}
            description={props.activity}
            />
            : ''}
            {item === 'Yчеба' ? 
            <VizitkaAboutBlock 
              title = {'Yчеба'}
              comments_number = {props.studies_comments_number}
              description={props.studies}
            />
            : ''}
          </li> 
        ))}
      </ul>
    </section>
  );
};
export default Vizitka;