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
import { FC, useState } from 'react';
import { patchProfile, uploadFiles } from '../../utils/api';
import { IProfileForm } from '../../utils/types';
import { cities, samples } from './utils';

export const ProfileForm: FC<IProfileForm> = ({
  profile,
  info,
  userId,
  avatar
}) => {

  const [nicknameTelegram, setNicknameTelegram] = useState<string>(profile.telegram ?? '');
  const [hobbies, setHobbies] = useState<string>(info.hobby.text ?? '');
  const [motto, setMotto] = useState<string>(profile.quote ?? '');
  const [userPhoto, setUserPhoto] = useState<File | string>(avatar ?? '');
  const [birthday, setBirthday] = useState<Date | null>(new Date(profile.birthday as any));
  const [city, setCity] = useState<string>(profile.city.name ?? '');
  const [github, setGithub] = useState<string>(profile.github ?? '');
  const [sample, setSample] = useState<string>(profile.template ?? samples[0]);
  const [family, setFamily] = useState<string>(info.status.text ?? '');
  const [lastWork, setLastWork] = useState<string>(info.job.text ?? '');
  const [dicisionStudy, setDicisionStudy] = useState<string>(info.edu.text ?? '');

  const [fileHobbies, setFileHobbies] = useState<File>();
  const [fileFamily, setFileFamily] = useState<File>();

  const [isShowErrorPhoto, setIsShowErrorPhoto] = useState<boolean>(false);
  const [isShowErrorBirthday, setIsShowErrorBirthday] = useState<boolean>(false);
  const [isShowErrorGithubLink, setIsShowErrorGithubLink] = useState<boolean>(false);
  const [isShowErrorCity, setIsShowErrorCity] = useState<boolean>(false);

  const getTemporaryFileLinks = async () => {
    const formData = new FormData();
    
    fileHobbies && formData.append('hobby', (fileHobbies as File));
    fileFamily && formData.append('status', (fileFamily as File));
    typeof userPhoto !== 'string' && formData.append('photo', (userPhoto as File));
    const updateUserInfo = {
      "profile": {
        "name": profile?.name,
        "photo": profile.photo,
        "city": {
          "name": city,
          "geocode": profile.city.geocode
        },
        "birthday": birthday,
        "template": sample
      },
      "info":{
        "hobby": {
          "text": hobbies,
          "image": null
        },
        "status": {
          "text": family,
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
    motto !== '' && ((updateUserInfo.profile as any).quote = motto)
    nicknameTelegram !== '' && ((updateUserInfo.profile as any).telegram = nicknameTelegram)
    github !== '' && ((updateUserInfo.profile as any).github = github)
    if (Array.from(formData.keys()).length) {
      await uploadFiles(formData).then(files => {
        (updateUserInfo as any).info.hobby.image = files.hobby?.file ?? info.hobby.image;
        (updateUserInfo as any).info.status.image = files.status?.file ?? info.status.image;
        (updateUserInfo as any).profile.photo = files.photo?.file ?? profile.photo;
        patchProfile((updateUserInfo as any), userId)
      })

    }
    else {
      patchProfile((updateUserInfo as any), userId)
    }

  }

  const handlerSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (birthday === null) {
      setIsShowErrorBirthday(true);
    }
    if (userPhoto === '') {
      setIsShowErrorPhoto(true);
    }
    if (city === '') {
      setIsShowErrorCity(true);
    }
    birthday !== null && userPhoto !== '' && city !=='' && getTemporaryFileLinks()
  };

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
        stateError={isShowErrorBirthday}
        setStateError={setIsShowErrorBirthday}
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
        value={nicknameTelegram}
        labelName={'Ник в телеграм'}
        onChange={(e) => setNicknameTelegram((e.target as HTMLInputElement).value)}
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
        state={sample}
        setState={setSample}
        data={samples}
        title={'Выберите шаблон'}
        requiredField={true}
      />
      <Textarea
        maxLength={100}
        labelName={'Девиз, цитата'}
        state={motto}
        setState={setMotto}
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
        state={fileFamily}
        defaultName={info.status.image ? `${info.status._id}.jpeg` : ''}
        setState={setFileFamily}
      />
      <Textarea maxLength={300} state={family} setState={setFamily} />
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
      <GraidentButton type={'submit'} text={'Сохранить'} />
    </form>
  );
}