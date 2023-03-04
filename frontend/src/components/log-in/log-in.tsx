import { useHistory } from "react-router-dom";
import { GraidentButton } from "../graidentButton/graidentButton";
import styles from "./log-in.module.css";

export const LogIn = () => {
  const history = useHistory();

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.header}>С кем я учусь?</h1>
          <GraidentButton
            type={"button"}
            text={"Войти с Яндекс ID"}
            handlerClick={() => history.push("/switch-profile")}
          />
      </div>
    </div>
  );
};
