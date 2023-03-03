import { ChangeEvent, FC, RefObject } from "react"
import styles from "./graidentButton.module.css"

interface IGraidentButton {
    type: "submit" | "button" | "file",
    text: string,
    handlerClick?: () => void,
    onChange?:  (e:ChangeEvent<HTMLInputElement>) => void,
    inputFileRef?: RefObject<HTMLInputElement>
}
export const GraidentButton: FC<IGraidentButton> = ({
    type,
    text,
    handlerClick,
    onChange,
    inputFileRef
}) => {

    return (
        <label>
            {type === "file" ?
                <>
                    <input type="file" onChange={onChange} ref={inputFileRef} />
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