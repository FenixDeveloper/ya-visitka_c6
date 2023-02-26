import styles from "./input.module.css"
import { ChangeEventHandler, FC } from "react"

interface IInput {
    type: "text" | "email",
    value: string,
    labelName: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
}
export const Input: FC<IInput> = ({
    type,
    value,
    labelName,
    onChange,
}) => {
    return (
        <label>

            <p className={styles.text}>{labelName}</p>
            
            <input
                className={styles.input}
                type={type}
                value={value}
                onChange={onChange}
            />
        </label>
    )
}