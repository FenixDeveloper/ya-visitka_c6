import { FC } from "react";
import styles from "./Vizitka.module.css";
import { IVizitka } from "../../utils/types";
import icon from "../../images/icons/comment.svg";
import person_img from "./person_img.png";

const Vizitka: FC<IVizitka> = (props) => {
  const blocksTitle = ['Увлечения', 'Семья', 'Cфера', 'Yчеба']
  return (
    <section>
       <ul className={styles.blocks}>
        {blocksTitle.map((item, index) => (
          <div>{item}</div>
        ))}
      </ul>
    </section>
  );
};
export default Vizitka;