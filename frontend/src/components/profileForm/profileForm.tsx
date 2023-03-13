import DropdownList from '../../components/DropdownList/DropdownList';
import { GraidentButton } from '../../components/graidentButton/graidentButton';
import { Input } from '../../components/input/input';
import { InputDate } from '../../components/inputDate/inputDate';
import { InputFile } from '../../components/inputFile/inputFile';
import { Textarea } from '../../components/textarea/textarea';
import { UploadPhoto } from '../../components/uploadPhoto/uploadPhoto';
import { SearchBox } from '../../components/search-box/search-box';
import styles from './profileForm.module.css';
import { InputGithubLink } from '../../components/input-github-link/input-github-link';
import { ErrorMessage } from '../../components/errorMessage/errorMessage';
import { FC, useEffect, useState } from 'react';
import { patchProfile, uploadFiles } from '../../utils/api';
import { IProfileForm } from '../../utils/types';
import { cities, templates } from './utils';

export const ProfileForm: FC<IProfileForm> = ({
  profile,
  info,
  userId,
  avatar
}) => {

  const [telegram, setTelegram] = useState<string>(profile.telegram ?? '');
  const [hobbies, setHobbies] = useState<string>(info.hobby.text ?? '');
  const [quote, setQuote] = useState<string>(profile.quote ?? '');
  const [userPhoto, setUserPhoto] = useState<File | string>(avatar ?? '');
  const [birthday, setBirthday] = useState<Date>(new Date(profile.birthday ?? new Date()));
  const [city, setCity] = useState<string>(profile.city.name ?? '');
  const [github, setGithub] = useState<string>(profile.github ?? '');
  const [template, setTemplate] = useState<string>(profile.template ?? templates[0]);
  const [status, setStatus] = useState<string>(info.status.text ?? '');
  const [lastWork, setLastWork] = useState<string>(info.job.text ?? '');
  const [dicisionStudy, setDicisionStudy] = useState<string>(info.edu.text ?? '');

  const [fileHobbies, setFileHobbies] = useState<File>();
  const [fileStatus, setFileStatus] = useState<File>();

  const [isShowErrorPhoto, setIsShowErrorPhoto] = useState<boolean>(false);
  const [isShowErrorGithubLink, setIsShowErrorGithubLink] = useState<boolean>(false);
  const [isShowErrorCity, setIsShowErrorCity] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isShowSuccessMessage, setIsShowSuccessMessage] = useState<boolean>(false);
  const [isLoadingSendForm, setIsLoadingSendForm] = useState<boolean>(false);

  const getTemporaryFileLinks = async () => {
    const formData = new FormData();

    fileHobbies && formData.append('hobby', (fileHobbies as File));
    fileStatus && formData.append('status', (fileStatus as File));
    typeof userPhoto !== 'string' && formData.append('photo', (userPhoto as File));

    const updateUserInfo = {
      "profile": {
        "name": profile.name,
        "photo": profile.photo,
        "city": {
          "name": city,
          "geocode": profile.city.geocode
        },
        "birthday": birthday,
        "template": template
      },
      "info": {
        "hobby": {
          "text": hobbies,
          "image": null
        },
        "status": {
          "text": status,
          "image": null
        },
        "job": {
          "text": lastWork,
          "image": null
        },
        "edu": {
          "text": dicisionStudy,
          "image": null
        }
      }
    }
    quote !== '' && ((updateUserInfo.profile as any).quote = quote)
    telegram !== '' && ((updateUserInfo.profile as any).telegram = telegram)
    github !== '' && ((updateUserInfo.profile as any).github = github)
    if (Array.from(formData.keys()).length) {
      await uploadFiles(formData).then(files => {
        (updateUserInfo as any).info.hobby.image = files.hobby?.file ?? info.hobby.image;
        (updateUserInfo as any).info.status.image = files.status?.file ?? info.status.image;
        (updateUserInfo as any).profile.photo = files.photo?.file ?? profile.photo;
        setIsLoadingSendForm(true)
        patchProfile((updateUserInfo as any), userId).then(() => { setIsSuccess(true); setIsLoadingSendForm(false) })
      })

    }
    else {
      setIsLoadingSendForm(true)
      patchProfile((updateUserInfo as any), userId).then(() => { setIsSuccess(true); setIsLoadingSendForm(false) })
    }

  }

  const handlerSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userPhoto === '') {
      setIsShowErrorPhoto(true);
      window.scrollTo({top:0, left: 0, behavior: "smooth"})
    }
    if (city === '') {
      setIsShowErrorCity(true);
      window.scrollTo({top:0, left: 0, behavior: "smooth"})
    }

    userPhoto !== '' && city !== '' && getTemporaryFileLinks()
  };

  useEffect(() => {
    if (isSuccess) {
      setIsShowSuccessMessage(true);

      setTimeout(() => {
        setIsShowSuccessMessage(false)
        setIsSuccess(false)
      }, 3000);
    }

  }, [isSuccess]);

  return (
    <form className={styles.profile} onSubmit={handlerSubmit}>
      <UploadPhoto
        state={(userPhoto as File)}
        setState={(setUserPhoto as any)}
        stateError={isShowErrorPhoto}
        setStateError={setIsShowErrorPhoto}
      />
      <InputDate
        labelName={'Дата рождения'}
        state={birthday}
        setState={setBirthday}
      />
      <SearchBox
        setStateError={setIsShowErrorCity}
        setState={setCity}
        city={city}
        listDefaultCities={cities}
      />
      {isShowErrorCity && <ErrorMessage>Поле обязательно для заполнения</ErrorMessage>}
      <Input
        type={'text'}
        value={telegram}
        labelName={'Ник в телеграм'}
        onChange={(e) => setTelegram((e.target as HTMLInputElement).value)}
      />
      <InputGithubLink
        type={'text'}
        value={github}
        labelName={'Ник на гитхабе'}
        onChange={(e) => setGithub((e.target as HTMLInputElement).value)}
        setValue={setGithub}
        stateError={isShowErrorGithubLink}
        setStateError={setIsShowErrorGithubLink}
      />
      <DropdownList
        state={template}
        setState={setTemplate}
        data={templates}
        title={'Выберите шаблон'}
        requiredField={true}
      />
      <Textarea
        maxLength={100}
        labelName={'Девиз, цитата'}
        state={quote}
        setState={setQuote}
      />
      <InputFile
        labelName={'Увлечения, досуг, интересы'}
        state={fileHobbies}
        defaultName={info.hobby.image ? `${info.hobby._id}.jpeg` : ''}
        setState={setFileHobbies}
      />
      <Textarea maxLength={300} state={hobbies} setState={setHobbies} />
      <InputFile
        labelName={'Семья, статус, домашние животные'}
        state={fileStatus}
        defaultName={info.status.image ? `${info.status._id}.jpeg` : ''}
        setState={setFileStatus}
      />
      <Textarea maxLength={300} state={status} setState={setStatus} />
      <Textarea
        labelName={'Из какой сферы пришёл? Кем работаешь?'}
        maxLength={300}
        state={lastWork}
        setState={setLastWork}
      />
      <Textarea
        labelName={'Почему решил учиться на веб-разработчика?'}
        maxLength={300}
        state={dicisionStudy}
        setState={setDicisionStudy}
      />
      <p className={styles.tip}>
        Поля, отмеченные звездочкой, обязательны для заполнения
      </p>
      <GraidentButton
        type={'submit'}
        text={isLoadingSendForm ? 'Сохранение...' : 'Сохранить'}
        disabled={isLoadingSendForm}
      />

      <p
        className={isShowSuccessMessage ? `${styles.tip} ${styles.showMessage}` : `${styles.tip} ${styles.hideMessage}`}
      >
        Данные успешно сохранены
      </p>

    </form>
  );
}