import { FC, useEffect } from "react"
import { Calendar } from "../calendar/calendar"
import { ErrorMessage } from "../errorMessage/errorMessage"
import styles from "./inputDate.module.css"

interface IInputDate {
    labelName: string,
    state: any,
    setState: any,
    stateError: boolean,
    setStateError: (value: boolean) => void,
}
export const InputDate: FC<IInputDate> = ({
    labelName,
    state,
    setState,
    stateError,
    setStateError
}) => {

    useEffect(() => {
        if(state !== null){
            setStateError(false);
        }
    }, [setStateError, state])

    return (
        <label>
            <p className={styles.text}>{labelName}<span>*</span></p>
            <Calendar startDate={state} setStartDate={setState} />
           {stateError && <ErrorMessage>Поле обязательно для заполнения</ErrorMessage>}
        </label>
    )
}