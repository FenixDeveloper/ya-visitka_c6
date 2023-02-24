import styles from "./input.module.css"
import { ChangeEventHandler, FC } from "react"

interface IInput {
    type: "text" | "email",
    value: string,
    labelName: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    requiredField?: boolean
}
export const Input: FC<IInput> = ({
    type,
    value,
    labelName,
    onChange,
    requiredField = false
}) => {
    return (
        <label>
            {
                requiredField ?
                    <p className={styles.text}>{labelName}<span>*</span></p> :
                    <p className={styles.text}>{labelName}</p>
            }
            <input
                className={styles.input}
                type={type}
                value={value}
                onChange={onChange}
            />
        </label>
    )
}