import { useEffect, useState, useContext } from 'react';
import styles from './MainPage.module.css';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import DropdownList from '../../components/DropdownList/DropdownList';
import { AppContext } from '../../utils/AppContext';
import {
  getComments,
  getProfiles,
  getToken,
  getUsers,
  loginUser,
} from '../../utils/api';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { IUserInfo } from '../../utils/types';

const data: Array<IUserInfo> = [
  {
    _id: '2cb3baaa7528a9bb5e2c20d9',
    createdAt: 1669314103470,
    updatedAt: null,
    email: 'Reymundo.Harvey@hotmail.com',
    cohort: 'web+16',
    profile: {
      name: 'Mr. Daniel Anderson',
      photo: 'https://loremflickr.com/640/480/cats',
      city: {
        name: 'Fadelland',
        geocode: [55.1681, 37.9411],
      },
    },
  },
  {
    _id: 'a18ca3c1e13dd93ddded5bbc',
    createdAt: 1647633379631,
    updatedAt: null,
    email: 'Caden5@yahoo.com',
    cohort: 'web+16',
    profile: {
      name: 'Shari Kassulke DDS',
      photo: 'https://loremflickr.com/640/480/cats',
      city: {
        name: 'Sarasota',
        geocode: [55.4525, 37.6147],
      },
    },
  },
  {
    _id: 'a18ca3c1e13dd93ddded5bbc1',
    createdAt: 1647633379631,
    updatedAt: null,
    email: 'Caden5@yahoo.com',
    cohort: 'web+11',
    profile: {
      name: 'Diam A',
      photo: 'https://loremflickr.com/640/480/cats',
      city: {
        name: 'Sarasota',
        geocode: [55.4525, 37.6147],
      },
    },
  },
  {
    _id: 'a18ca3c1e13dd93ddded5bbc2',
    createdAt: 1647633379631,
    updatedAt: null,
    email: 'Caden5@yahoo.com',
    cohort: 'web+14',
    profile: {
      name: 'Ror',
      photo: 'https://loremflickr.com/640/480/cats',
      city: {
        name: 'Sarasota2',
        geocode: [55.4525, 37.6147],
      },
    },
  },
  {
    _id: 'a18ca3c1e13dd93ddded5bbc3',
    createdAt: 1647633379631,
    updatedAt: null,
    email: 'Caden5@yahoo.com',
    cohort: 'web+16',
    profile: {
      name: 'Lovv DDS',
      photo: 'https://loremflickr.com/640/480/cats',
      city: {
        name: 'Sarasota1',
        geocode: [55.4525, 37.6147],
      },
    },
  },
];

export const MainPage = (props1: any) => {
  const history = useHistory();
  const [city, setCity] = useState<string>('Все города');
  const [props, setProps] = useState<Array<IUserInfo>>([]);
  const [role, setRole] = useState<String>('');
  const { state, dispatch } = useContext(AppContext);
  const [cities, setCities] = useState<Array<string>>([]);
  const [initalProps, setInitalProps] = useState<Array<IUserInfo>>([]);
  //Добавляла не я
  /*  const authorizeUser = async (code: string) => {
    try {
      if (!localStorage.getItem('auth_token')) {
        const response = await getToken(code);
        if (response && response.token) {
          const user = await loginUser();
          if (user) {
            console.log(user);
            dispatch({ type: 'success', results: user });
          }

          history.replace({ pathname: '/gifts/line' });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const code = params.get('code');
    if (code) {
      authorizeUser(code);
    }
  }, []);*/

  //Получение пользователей(сортировка по корготам) и их данных
  useEffect(() => {
    //Роль авторизированного пользователя
    if (state.data === null) {
      getUser();
    }
    state.data && setRole(state.data.user.role);
    //state.data != null && setRole(state.data.role);

    //Получение пользователей
    getProfiles().then((res: { items: Array<IUserInfo> }) => {
      console.log(state);
      console.log(res.items);
      let sortedData = [];
      if (role === 'student') {
        console.log('Зашли под студентом')        //поменять на student
        state.data.cohort = 'web+06'; //стереть
        sortedData = res.items.filter(
          (student) =>
            student.cohort === (state.data != null && state.data.cohort),
        );
      } else {
        console.log('Зашли под куратором')
        //Взять из params корготу и отфлитровать всех студентов (для кураторов)
        let params = document.location.pathname.substring(8);
        sortedData = res.items.filter((student) => student.cohort === params);
      }
      console.log(sortedData);
      setProps(sortedData);
      setInitalProps(sortedData);
      let arr: Array<string> = ['Все города'];
      sortedData.forEach((item) => {
        arr.push(item.profile.city.name);
      });
      setCities(Array.from(new Set(arr)).filter((item) => item != undefined));
    });
  }, []);

  const getUser = async () => {
    const user: any = await loginUser();
    if (user) {
      dispatch({ type: 'success', results: user });
    }
  };
  //Сортировка пользователей по городам
  useEffect(() => {
    const user: any = state.data;
    const sortedData = props.filter(
      (student) => student.cohort === (user && user.user.cohort),
    );
    if (city !== 'Все города') {
      const result = sortedData.filter(
        (person) => person.profile.city.name === city,
      );
      setProps(result);
    } else {
      setProps(initalProps);
    }
  }, [city]);

  return (
    <section className={styles.main}>
      <div className={styles.header}>
        <DropdownList data={cities} state={city} setState={setCity} />
        <Link to={'/maps'} className={styles.link}>
          Посмотреть на карте
        </Link>
      </div>
      <ul className={styles.cards}>
        {props.map((item) => (
          <ProfileCard
            id={item._id}
            image={item.profile.photo}
            city={item.profile.city.name}
            name={item.profile.name}
            key={item._id}
            role={String(role)}
          />
        ))}
      </ul>
    </section>
  );
};

export default MainPage;
