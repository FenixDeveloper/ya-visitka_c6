import { FC, useState, useEffect } from "react";
import { useParams } from "react-router";
import Vizitka from "../../components/vizitka/Vizitka";
import styles from "./VizitkaPage.module.css";
import person_img from './person_img.png'
import hobby_img from './hobby_img.png'
import family_img from './family_img.png'
import { VizitkaStyle, IProfiles } from "../../utils/types";
import { getProfile, getProfiles, getReactions, getFile } from '../../utils/api'
// тестовые данные
const vizitkaData = {
  name: 'Виктория Листвиновская',
  image: person_img,
  quotes: 'Делай, что должно и будь, что будет.',
  city: 'Калуга',
  contacts: {
    telegram: 'https://t.me/person',
    github: 'https://github.com/person',
  },
  hobby:
    'Увлекаюсь программированием, игрой на гитаре, вышиваю крестиком и играю в настолки. Увлекаюсь программированием, игрой на гитаре, вышиваю крестиком и играю в настолки. Увлекаюсь программированием, игрой на гитаре, вышиваю крестиком и играю в настолки.',
  hobby_image: hobby_img,
  family:
    'Замужем, двое детей, собака. Живу в городе Калуга, люблю этот маленький городок. С собакой часто ходим на прогулки и наблюдаем за природой',
  family_image: family_img,
  activity:
    'Работаю в сфере гостиничного бизнеса, управляющим отелем. Люблю работать с людьми, постоянно вижу новых людей, общаюсь с посетителями, управляю персоналом, обучаю и принимаю на работу новых сотрудников.',
  studies:
    'Надоело работать в одной сфере, хочу сменить деятельность, нет шансов на рост, хочу быть айтишником. В детстве любила информатику, компьютерные игры и разбираться с программами. Вот вспомнила деские мечты и решила воплотить их в реальность. Надеюсь, что у меня все получится.',
  photo_comments_number: 1,
  quotes_comments_number: 2,
  hobby_comments_number: 3,
  family_comments_number: 4,
  activity_comments_number: 5,
  studies_comments_number: 6,
  style: VizitkaStyle.Base,
};



export const VizitkaPage = (props1: any) => {
  const { id } = useParams<{ id: string }>();

  const [profile, setProfile] = useState<{data: IProfiles | null; isLoading: boolean; hasError: boolean}>({
    data: null,
    isLoading: false,
    hasError: false,
  });
  const [avatar, setAvatar] = useState<string>('');

  const { data, isLoading, hasError } = profile;

  useEffect(() => {
    setProfile({ ...profile, hasError: false, isLoading: true });
    getProfileData();
  }, []);

  const getProfileData = async() => {
    getProfile(id)
    .then(data => {
      if(data.profile.photo) {
        getFile(data.profile.photo).then(imageBlob => setAvatar(URL.createObjectURL(imageBlob)))
      }
      setProfile({ ...profile, data: data, isLoading: false })
    })
      .catch(e => {
        setProfile({ ...profile, hasError: true, isLoading: false });
      })}

  return (
    <section className={styles.vizitka}>
      {isLoading && "Загрузка ..."}
      {hasError && "Ошибка"}
      {!isLoading && !hasError && profile && profile.data && profile.data.profile &&
       <Vizitka
         name = {profile.data.profile.name}
        //  image = {profile.data.profile.photo}
         image = {avatar}
         quotes = {profile.data.profile.quote}
         city = {profile.data.profile.city.name}
         telegram = {`https://t.me/${profile.data.profile.telegram}`}
         github = {`https://github.com/${profile.data.profile.github}`}
         hobby = {profile.data.info.hobby.text}
         hobby_img={profile.data.info.hobby.image}
         family = {profile.data.info.status.text}
         family_img={profile.data.info.status.image}
         activity = {profile.data.info.job.text}
         studies = {profile.data.info.edu.text}
         photo_comments_number={profile.data.reactions}
         quotes_comments_number={vizitkaData.quotes_comments_number}
         hobby_comments_number={profile.data.info.hobby.reactions}
         family_comments_number={profile.data.info.status.reactions}
         activity_comments_number={profile.data.info.job.reactions}
         studies_comments_number={profile.data.info.edu.reactions}
         style={vizitkaData.style}
      />}
      {/* <Vizitka 
      name = {vizitkaData.name}
      image = {vizitkaData.image}
      quotes = {vizitkaData.quotes}
      city = {vizitkaData.city}
      contacts = {vizitkaData.contacts}
      hobby = {vizitkaData.hobby}
      hobby_img={vizitkaData.hobby_image}
      family = {vizitkaData.family}
      family_img={vizitkaData.family_image}
      activity = {vizitkaData.activity}
      studies = {vizitkaData.studies}
      photo_comments_number={vizitkaData.photo_comments_number}
      quotes_comments_number={vizitkaData.quotes_comments_number}
      hobby_comments_number={vizitkaData.hobby_comments_number}
      family_comments_number={vizitkaData.family_comments_number}
      activity_comments_number={vizitkaData.activity_comments_number}
      studies_comments_number={vizitkaData.studies_comments_number}
      style={vizitkaData.style}
    /> */}
    </section>
  );
};

export default VizitkaPage;
