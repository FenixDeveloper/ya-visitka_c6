import { FC } from "react"
import { urlGithub } from '../../utils/constants';
import { Input } from '../input/input'

interface IInput {
    type: "text",
    value: string,
    labelName: string,
    setValue?: (value: string) => void
    stateError: boolean,
    setStateError: (value: boolean) => void,
}

export const InputGithubLink: FC<IInput & React.HTMLProps<HTMLInputElement>> = ({
    value,
    labelName,
    onChange,
    setValue,
    stateError,
    setStateError,
    ...props
}) => {

    const extractNickname = (nicknameOrLink: string) => {
        if (nicknameOrLink.startsWith('http')) {
            return nicknameOrLink.slice(nicknameOrLink.lastIndexOf('/') + 1, nicknameOrLink.length);
        }
        return nicknameOrLink;
    }

    const isExistGithubProfile = async () => {
        const nickname = extractNickname(value);
        let result = null;
        try {
            result = await fetch(urlGithub + nickname, {
                method: 'HEAD',
            });
        } catch (e) {
            console.log(e);
        }
        if (result?.ok && setValue) {
                setValue(nickname);
                setStateError(false);
        } else {
            setStateError(true);
        }

        return result?.ok;
    }

    return (
        <Input
            value={value}
            labelName={labelName}
            {...props}
            onChange={onChange}
            onBlur={async _ => await isExistGithubProfile()}
            messageError={'Некорректная ссылка на профиль гитхаба'}
            stateError={stateError}
        />
    )
}