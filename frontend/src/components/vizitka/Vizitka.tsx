import { FC } from "react";
import styles from "./Vizitka.module.css";
import { IVizitka } from "../../utils/types";

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