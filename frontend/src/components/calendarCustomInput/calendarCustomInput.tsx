import styles from "./calendarCustomInput.module.css"
import icon from "../../images/icons/calendar.svg";
import { forwardRef } from "react";

export const CalendarCustomInput = forwardRef(({ value, onClick }: any, ref) => (
    <div className={styles.fakeDate} onClick={onClick} ref={ref as any}>
        <p>{value}</p>
        <img src={icon} alt="Календарь" />
    </div>
))