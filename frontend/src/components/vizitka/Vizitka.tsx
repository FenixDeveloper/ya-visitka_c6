import { FC } from "react";
import styles from "./Vizitka.module.css";
import { IVizitka } from "../../utils/types";
import telegram_logo from './telegram.svg';
import github_logo from './GitHub.svg';
import quotes_img from './quotes.svg';

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
        <li className={styles.block}>
        <img src={props.image} alt='Фотоп персоны' className={styles.image}/>
        </li>
        <li className={styles.quotesBlock}>
        <img src={quotes_img} alt='Лого GitHun' className={styles.quotesImg} />
        <p className={styles.quotes}>
            {props.quotes}
          </p>
        </li>
      </ul>
       <ul className={styles.blocks}>
        {blocksTitle.map((item, index) => (
          <li className={styles.block}>
            {item === 'Увлечения' ? 
            <div className={styles.aboutBlock}>
              <p className={styles.aboutBlockTitle}>{item}</p>
              <img className = {styles.img} src={props.hobby_img} alt='Фото хобби' />
              <p className={styles.aboutBlockText}>{props.hobby}</p>
            </div> : ''}
            {item === 'Семья' ? 
            <div className={styles.aboutBlock}>
              <p className={styles.aboutBlockTitle}>{item}</p>
              <img className = {styles.img} src={props.family_img} alt='Фото семьи' />
              <p className={styles.aboutBlockText}>{props.family}</p>
            </div> : ''}
            {item === 'Cфера' ? 
            <div className={styles.aboutBlock}>
              <p className={styles.aboutBlockTitle}>{item}</p>
              <p className={styles.aboutBlockText}>{props.activity}</p>
            </div> : ''}
            {item === 'Yчеба' ? 
            <div className={styles.aboutBlock}>
              <p className={styles.aboutBlockTitle}>{item}</p>
              <p className={styles.aboutBlockText}>{props.studies}</p>
            </div> : ''}
          </li> 
        ))}
      </ul>
    </section>
  );
};
export default Vizitka;