import { FC } from "react"
import styles from "./textarea.module.css"

interface ITextarea {
    maxLength: number,
    labelName?: string,
    state: string,
    setState: (value: string) => void
}

export const Textarea: FC<ITextarea> = ({
    maxLength,
    labelName,
    state,
    setState
}) => {

    const handlerChange = (e: { target: { value: string } }) => {
        setState(e.target.value)
    }

    return (
        <label>
            <p className={styles.text}>{labelName}</p>
            <textarea
                className={`${styles.textarea} ${styles.scrollbar}`}
                maxLength={maxLength}
                placeholder={`Не более ${maxLength} символов`}
                onChange={handlerChange}
                value={state}
            />
        </label>
    )
}