import { ChangeEvent, FC } from "react"
import styles from "./graidentButton.module.css"

interface IGraidentButton {
    type: "submit" | "button" | "file",
    text: string,
    handlerClick?: () => void,
    setState?: (value: File | undefined) => void
}
export const GraidentButton: FC<IGraidentButton> = ({
    type,
    text,
    setState,
    handlerClick
}) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : undefined;
        setState && setState(file);
    }

    return (
        <label>
            {type === "file" ?
                <>
                    <input type="file" onChange={onChange} />
                    <div className={`${styles.input} ${styles.small}`}>
                        <p>{text}</p>
                    </div>
                </> :
                <input
                    className={`${styles.input} ${styles.large}`}
                    type={type}
                    value={text}
                    onClick={handlerClick}
                />
            }
        </label >
    )
}