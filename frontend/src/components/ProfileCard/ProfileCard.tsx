import { FC, useEffect, useState, useContext } from 'react';
import styles from './ProfileCard.module.css';
import { IProfileCard } from '../../utils/types';
import icon from '../../images/icons/comment.svg';
import CommentPost from '../comment-post/comment-post';
import { emojies } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { getProfile, getReactions } from '../../utils/api';
import { AppContext } from '../../utils/AppContext';

//https://visitki.practicum-team.ru/api/profiles/{$id}/reactions
const reaction = {
  total: 9,
  items: [
    {
      _id: 'd9c312b1b8cedfcf6dc5c1cc',
      from: {
        _id: 'a18ca3c1e13dd93ddded5bbc',
        name: 'Shari Kassulke DDS',
        email: 'Caden5@yahoo.com',
        cohort: 'web+16',
      },
      target: 'hobby',
      text: 'Non architecto architecto dolore.',
    },
    {
      _id: 'c9f666d1672db4b97c878c52',
      from: {
        _id: 'a18ca3c1e13dd93ddded5bbc',
        name: 'Shari Kassulke DDS',
        email: 'Caden5@yahoo.com',
        cohort: 'web+16',
      },
      target: 'edu',
      text: 'Nobis voluptatum quasi.',
    },
    {
      _id: 'e3d8cdcd05fffc267c52f8db',
      from: {
        _id: 'a18ca3c1e13dd93ddded5bbc',
        name: 'Shari Kassulke DDS',
        email: 'Caden5@yahoo.com',
        cohort: 'web+16',
      },
      target: 'status',
      text: 'Hic ad aliquam quisquam maiores.',
    },
    {
      _id: 'ce55b99393e4cb81fb9dafa0',
      from: {
        _id: 'a18ca3c1e13dd93ddded5bbc',
        name: 'Shari Kassulke DDS',
        email: 'Caden5@yahoo.com',
        cohort: 'web+16',
      },
      target: 'job',
      text: 'Quas laboriosam fugiat eaque.',
    },
    {
      _id: '4bccfcadf5dbbeec937ca020',
      from: {
        _id: 'a18ca3c1e13dd93ddded5bbc',
        name: 'Shari Kassulke DDS',
        email: 'Caden5@yahoo.com',
        cohort: 'web+16',
      },
      target: 'quote',
      text: 'Natus sunt ratione ipsa.',
    },
    {
      _id: 'beed8ccea87a889d1f8f7fea',
      from: {
        _id: 'a18ca3c1e13dd93ddded5bbc',
        name: 'Shari Kassulke DDS',
        email: 'Caden5@yahoo.com',
        cohort: 'web+16',
      },
      target: null,
      text: 'Sed sequi animi laborum dolorum praesentium.',
    },
    {
      _id: '0578ddd790cbd0dfac6b04bb',
      from: {
        _id: 'a18ca3c1e13dd93ddded5bbc',
        name: 'Shari Kassulke DDS',
        email: 'Caden5@yahoo.com',
        cohort: 'web+16',
      },
      target: null,
      emotion: 'like',
    },
    {
      _id: '69c00c16b92cb274b8eacbeb',
      from: {
        _id: 'a18ca3c1e13dd93ddded5bbc',
        name: 'Shari Kassulke DDS',
        email: 'Caden5@yahoo.com',
        cohort: 'web+16',
      },
      target: null,
      emotion: 'smile',
    },
    {
      _id: 'b5d2ce77c55eb86d0ef2c3ce',
      from: {
        _id: 'a18ca3c1e13dd93ddded5bbc',
        name: 'Shari Kassulke DDS',
        email: 'Caden5@yahoo.com',
        cohort: 'web+16',
      },
      target: null,
      emotion: 'heart',
    },
    {
      _id: 'b5d2ce77c55eb86d0ef2c3ceq',
      from: {
        _id: 'a18ca3c1e13dd93ddded5bbc',
        name: 'Shari Kassulke DDS',
        email: 'Caden5@yahoo.com',
        cohort: 'web+16',
      },
      target: null,
      text: 'comment1',
    },
  ],
};

const reaction1 = {
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
      geocode: ['55.1681', '37.9411'],
    },
    birthday: 'Wed Jul 17',
    quote: 'tore maxime cupiditate.',
    telegram: 'Frida28',
    github: 'Kayla82',
    template: null,
  },
  info: {
    hobby: {
      text: 'Architecto neque quos totam corporis.\nRerum architecto dolores doloribus atque ipsam nihil.\nExplicabo enim accusantium saepe optio enim eius cumque earum et.\nReiciendis neque assumenda eaque minima aperiam excepturi fugiat eveniet.\nSapiente dignissimos quos commodi quis ipsa molestiae dolorum laudantium.',
      image: 'https://loremflickr.com/640/480/cats',
      reactions: 63,
    },
    status: {
      text: 'Sint quisquam asperiores.\nPerspiciatis voluptas quia modi.\nTempora harum fugit velit culpa libero laudantium omnis quidem.\nCorrupti repellendus explicabo sunt in sunt hic hic deserunt.\nDistinctio voluptas nisi.',
      image: 'https://loremflickr.com/640/480/cats',
      reactions: 57,
    },
    job: {
      text: 'Perferendis illo accusamus fugiat.\nSint quo minima odit.\nQuos quidem ab temporibus.\nMolestias dolorum quisquam molestias doloremque ab.\nSimilique accusamus laborum nihil nam voluptas quis laudantium laudantium.',
      image: 'https://loremflickr.com/640/480/cats',
      reactions: 8,
    },
    edu: {
      text: 'Earum sint culpa doloribus.\nCorrupti nobis harum numquam tenetur perferendis.\nArchitecto veritatis nam eaque laudantium commodi totam commodi accusamus.\nEsse non illo porro recusandae fugiat assumenda.\nSimilique assumenda dolorem exercitationem non impedit voluptate quasi inventore.',
      image: 'https://loremflickr.com/640/480/cats',
      reactions: 55,
    },
  },
  reactions: 9,
};

const ProfileCard: FC<IProfileCard> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { state, dispatch } = useContext(AppContext);
  const [comments, setComments] = useState<Array<string>>([]);
  const [reactions, setReactions] = useState<number>(0);
  const [owner, setOwner] = useState<boolean>(false);

  useEffect(() => {
    if (state.data != null && props.id === state.data._id) {
      setOwner(true);
    }

    //Получение комментариев для каждой карточки. Не срабатывает. 404 
   /*  getReactions(props.id).then((res) => {
       const filterComments = reaction.items.filter((comment) => comment.target === null)
      const commentText:Array<string> = []
      filterComments.forEach((comment)=>{
        comment.text && commentText.push(comment.text)
      })
      setComments(commentText);
    });*/
      const filterComments = reaction.items.filter(
        (comment) => comment.target === null,
      );
      const commentText: Array<string> = [];
      filterComments.forEach((comment) => {
        comment.text && commentText.push(comment.text);
      });
      setComments(commentText); //тестовые данные


    //Количество всех реакций (в кружочке)
    getProfile(props.id).then((res) => {
      console.log(res)
      //   setReactions(reaction1.reactions)
    });
    setReactions(reaction1.reactions); //тестовые


  }, []);
  return (
    <li className={styles.card}>
      <Link className={styles.link} to={'/vizitka'}>
        <img
          src={props.image}
          className={!open ? styles.image : styles.image_open}
          alt="Фото человека"
        />
      </Link>
      <div
        className={styles.icon__comment}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {reactions !== 0 && (owner || props.role === 'curator') && (
          <div
            className={
              open ? styles.comments_number_open : styles.comments_number
            }
          >
            {reactions}
          </div>
        )}
        <img
          src={icon}
          className={open ? styles.icon_open : styles.icon}
          alt="Иконка комментариев"
        />
      </div>
      {open && (
        <div className={styles.comment}>
          <CommentPost
            emojies={emojies}
            comments={comments}
//            emojies={[
//             { type: '👍', count: 1 },
//              { type: '👎️', count: 2 },
 //             { type: '🙂️', count: 0 },
//              { type: '😞️', count: 0 },
//              { type: '🤣️', count: 0 },
//              { type: '😬️', count: 0 },
//              { type: '😱️', count: 0 },
//             { type: '😍️', count: 0 },
//              { type: '❤️', count: 0 },
//            ]}
            class={true}
          />
        </div>
      )}
      <p
        className={`${styles.name} ${
          !open ? styles.name_close : styles.name_open
        }`}
      >
        {props.name}
      </p>
      <p className={styles.city}>{props.city}</p>

      {props.role === 'curator' && (
        <p className={styles.city}>{`${reactions} сообщений`}</p>
      )}
    </li>
  );
};
export default ProfileCard;
