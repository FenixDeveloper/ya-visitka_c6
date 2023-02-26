import { ChangeEvent, FC } from "react"
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

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
        setStateError(!e.target.value)
    }

    return (
        <label>
            <p className={styles.text}>{labelName}<span>*</span></p>
            <input type="date" value={state} onChange={onChange} />
           {stateError && <ErrorMessage>Поле обязательно для заполнения</ErrorMessage>}
        </label>
    )
}