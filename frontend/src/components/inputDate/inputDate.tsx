import { FC } from "react"
import { Calendar } from "../calendar/calendar"
import styles from "./inputDate.module.css"

interface IInputDate {
    labelName: string,
    state: any,
    setState: any,
}
export const InputDate: FC<IInputDate> = ({
    labelName,
    state,
    setState,

}) => {

    return (
        <label>
            <p className={styles.text}>{labelName}<span>*</span></p>
            <Calendar startDate={state} setStartDate={setState} />
        </label>
    )
}