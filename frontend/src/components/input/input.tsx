import styles from "./input.module.css"
import { FC } from "react"
import { ErrorMessage } from '../errorMessage/errorMessage'

interface IInput {
    type: "text" | "email",
    value: string,
    labelName: string,
    stateError?: boolean,
    setStateError?: (value: boolean) => void,
    messageError?: string,
}
export const Input: FC<IInput & React.HTMLProps<HTMLInputElement>> = ({
    type,
    value,
    labelName,
    onChange,
    stateError,
    setStateError,
    messageError,
    ...props
}) => {
    return (
        <label>

            <p className={styles.text}>{labelName}</p>

            <input
                {...props}
                className={styles.input}
                type={type}
                value={value}
                onChange={onChange}
            />
            {stateError && <ErrorMessage>{messageError}</ErrorMessage>}
        </label>
    )
}