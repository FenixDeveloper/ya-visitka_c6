import { useEffect, useState, useContext } from 'react';
import styles from './MainPage.module.css';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import person1 from './imagesData/person_1.png';
import person2 from './imagesData/person_2.png';
import person3 from './imagesData/person_3.png';
import person4 from './imagesData/person_4.png';
import DropdownList from '../../components/DropdownList/DropdownList';
import { AppContext } from '../../utils/AppContext';
import { getToken, loginUser } from '../../utils/api';
import { Link } from 'react-router-dom';

interface IData {
  name: string;
  city: string;
  image: string;
}
const data: Array<IData> = [
  //тестовые данные
  {
    name: 'Иванов Сергей',
    city: 'Москва',
    image: person1,
  },
  {
    name: 'Степанов Дмитрий',
    city: 'Жемчужное Костромской обл',
    image: person2,
  },
  {
    name: 'Наиля Назимова',
    city: 'Кингисепп Ленинградской обл',
    image: person3,
  },
  {
    name: 'Виктория Листвина',
    city: 'Калуга',
    image: person4,
  },
  {
    name: 'Иванов Сергей',
    city: 'Москва',
    image: person1,
  },
  {
    name: 'Степанов Дмитрий',
    city: 'Жемчужное Костромской обл',
    image: person2,
  },
  {
    name: 'Наиля Назимова',
    city: 'Кингисепп Ленинградской обл',
    image: person3,
  },
  {
    name: 'Виктория Листвина',
    city: 'Калуга',
    image: person4,
  },
];

export const MainPage = (props1: any) => {
  const [city, setCity] = useState<string>('Все города');
  const [props, setProps] = useState<Array<IData>>(data);
  const { state, dispatch } = useContext(AppContext);
  const cities: Array<string> = ['Все города'];

  data.forEach((item) => {
    cities.push(item.city);
  });

  useEffect(() => {
    if (city !== 'Все города') {
      const result = data.filter((person) => person.city === city);
      setProps(result);
    } else {
      setProps(data);
    }
  }, [city]);

  const authorizeUser = async (code: string) => {
    
    try {
      if (!localStorage.getItem('auth_token')) {
        const response = await getToken(code);
        if (response && response.token) {
          const user = await loginUser();
          if(user) {
            dispatch({ type: 'success', results: user });
          }
          
          // history.replace({ pathname: "/gifts/line" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const code = params.get('code');
    if(code) {
      authorizeUser(code);
    }
    
  }, []);

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <DropdownList data={cities} state={city} setState={setCity} />
        <Link to={'/maps'} className={styles.link}>
          Посмотреть на карте
        </Link>
      </div>
      <ul className={styles.cards}>
        {props.map((item, index) => (
          <ProfileCard
            image={item.image}
            city={item.city}
            name={item.name}
            key={index}
            comments_number={index}
          />
        ))}
      </ul>
    </section>
  );
};

export default MainPage;
