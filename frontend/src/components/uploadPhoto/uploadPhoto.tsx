import { ChangeEvent, FC } from "react"
import styles from "./uploadPhoto.module.css"
import icon from "../../images/icons/photo.svg"
import { ErrorMessage } from "../errorMessage/errorMessage"

interface IUploadPhoto {
    state: File | null,
    setState: (value: File | null) => void,
    stateError: boolean,
    setStateError: (value: boolean) => void,
}

export const UploadPhoto: FC<IUploadPhoto> = ({
    state,
    setState,
    stateError,
    setStateError
}) => {

    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        setState((files as any).length ? files![0] : null)
        setStateError(!files?.length)
    }

    return (
        <div className={styles.updatePhoto}>
            <p className={styles.text}>Загрузите фото<span>*</span></p>
            <p className={`${styles.text} ${styles.extraText}`}>(размер не менее 440х440 <span>пикселей</span>)</p>
            <label>
                <input type="file" onChange={handlerChange} />
                <div className={styles.fakeInput}>
                    {
                        state ?
                            <img className={styles.photo} src={typeof state ==="string" ? state : URL.createObjectURL(state)} alt="Фото пользователя" /> :
                            <div className={styles.wrapper}></div>
                    }
                     <div className={styles.rectangle}>
                            <img className={styles.icon} src={icon} alt="" />
                        </div>
                    
                </div>
            </label>
            {stateError && <ErrorMessage>Поле обязательно для заполнения</ErrorMessage>}
        </div>
    )
}