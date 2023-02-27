import { ChangeEvent, FC } from "react"
import styles from "./inputFile.module.css"
import icon from "../../images/icons/clip.svg"

interface IInputFile {
    labelName: string,
    state: File | undefined,
    setState: (value: File | undefined) => void
}

export const InputFile: FC<IInputFile> = ({
    labelName,
    state,
    setState
}
) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : undefined;
        setState(file);
    }

    return (
        <label>
            <p className={styles.text}>{labelName}</p>
            <input type="file" onChange={onChange} />
            <div className={styles.fakeInput}>
                <p>{state?.name}</p>
                <img className={styles.icon} src={icon} alt="Прикрипите файл" />
            </div>
            <p className={`${styles.text} ${styles.tip}`}>Рекомендуемый размер фото 230х 129</p>
        </label>
    )
}