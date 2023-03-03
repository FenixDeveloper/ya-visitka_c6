import { useState } from 'react';
import DropdownList from '../../components/DropdownList/DropdownList';
import { GraidentButton } from '../../components/graidentButton/graidentButton';
import { Input } from '../../components/input/input';
import { InputDate } from '../../components/inputDate/inputDate';
import { InputFile } from '../../components/inputFile/inputFile';
import { Textarea } from '../../components/textarea/textarea';
import { UploadPhoto } from '../../components/uploadPhoto/uploadPhoto';
import { SearchBox } from '../../components/search-box/search-box';
import styles from './profile.module.css';
import { ErrorMessage } from '../../components/errorMessage/errorMessage';

const samples = ['серьезный', 'романтичный', 'дерзкий'];
const cities = ["Москва", "Санкт-Петербург","Казань", "Екатеринбург"];

export const Profile = () => {
  const [nicknameTelegram, setNicknameTelegram] = useState<string>('');
  const [fileHobbies, setFileHobbies] = useState<File>();
  const [hobbies, setHobbies] = useState<string>('');
  const [motto, setMotto] = useState<string>('');
  const [userPhoto, setUserPhoto] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [github, setGithub] = useState<string>('');
  const [sample, setSample] = useState<string>(samples[0]);
  const [fileFamily, setFileFamily] = useState<File>();
  const [family, setFamily] = useState<string>('');
  const [lastWork, setLastWork] = useState<string>('');
  const [dicisionStudy, setDicisionStudy] = useState<string>('');

  const [isShowErrorPhoto, setIsShowErrorPhoto] = useState<boolean>(false);
  const [isShowErrorBirthday, setIsShowErrorBirthday] = useState<boolean>(false);
  const [isShowErrorCity, setIsShowErrorCity] = useState<boolean>(false);

  const handlerSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (birthday === '') {
      setIsShowErrorBirthday(true);
    }
    if (userPhoto === '') {
      setIsShowErrorPhoto(true);
    }
    if (city === '') {
      setIsShowErrorCity(true);
    }
  };

  return (
    <form className={styles.profile} onSubmit={handlerSubmit}>
      <UploadPhoto
        state={userPhoto}
        setState={setUserPhoto}
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
      <SearchBox setStateError={setIsShowErrorCity} setState={setCity} listDefaultCities={cities} />
      {isShowErrorCity && <ErrorMessage>Поле обязательно для заполнения</ErrorMessage>}
      <Input
        type={'text'}
        value={nicknameTelegram}
        labelName={'Ник в телеграм'}
        onChange={(e) => setNicknameTelegram(e.target.value)}
      />
      <Input
        type={'text'}
        value={github}
        labelName={'Ник на гитхабе'}
        onChange={(e) => setGithub(e.target.value)}
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
        setState={setFileHobbies}
      />
      <Textarea maxLength={300} state={hobbies} setState={setHobbies} />
      <InputFile
        labelName={'Семья, статус, домашние животные'}
        state={fileFamily}
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
};
