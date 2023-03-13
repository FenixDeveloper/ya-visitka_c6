import { FC, ReactNode } from "react"
import styles from "./errorMessage.module.css"

interface IErrorMessage {
    children: ReactNode
}

export const ErrorMessage: FC<IErrorMessage> = ({
    children
}) => {
    return (
        <p className={styles.error}>{children}</p>
    )
}