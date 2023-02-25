import Vizitka from "../../components/vizitka/Vizitka";
import styles from "./VizitkaPage.module.css";
import person_img from './person_img.png'
const vizitkaData = 
//тестовые данные
{
  name: 'Виктория Листвиновская',
  image: person_img,
  motto: 'Делай, что должно и будь, что будет.',
  city: 'Калуга',
  contacts: {
    telegram: 'https://t.me/person',
    github: 'https://github.com/person',
  },
  hobby: 'Увлекаюсь программированием, игрой на гитаре, вышиваю крестиком и играю в настолки. Увлекаюсь программированием, игрой на гитаре, вышиваю крестиком и играю в настолки. Увлекаюсь программированием, игрой на гитаре, вышиваю крестиком и играю в настолки.',
  family: 'Замужем, двое детей, собака. Живу в городе Калуга, люблю этот маленький городок. С собакой часто ходим на прогулки и наблюдаем за природой',
  activity: 'Работаю в сфере гостиничного бизнеса, управляющим отелем. Люблю работать с людьми, постоянно вижу новых людей, общаюсь с посетителями, управляю персоналом, обучаю и принимаю на работу новых сотрудников.',
  studies: 'Надоело работать в одной сфере, хочу сменить деятельность, нет шансов на рост, хочу быть айтишником. В детстве любила информатику, компьютерные игры и разбираться с программами. Вот вспомнила деские мечты и решила воплотить их в реальность. Надеюсь, что у меня все получится.',
}

export const VizitkaPage = (props1: any) => {

  return (
    <section className={styles.main}>
      <Vizitka 
        name = {vizitkaData.name}
        image = {vizitkaData.image}
        motto = {vizitkaData.motto}
        city = {vizitkaData.city}
        contacts = {vizitkaData.contacts}
        hobby = {vizitkaData.hobby}
        family = {vizitkaData.family}
        activity = {vizitkaData.activity}
        studies = {vizitkaData.studies}
      />
    </section>
  );
};

export default VizitkaPage;
