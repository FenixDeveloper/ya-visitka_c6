import { FC } from "react";
import styles from "./Vizitka.module.css";
import { IVizitka } from "../../utils/types";

const Vizitka: FC<IVizitka> = (props) => {
  const blocksTitle = ['Увлечения', 'Семья', 'Cфера', 'Yчеба']
  return (
    <section>
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