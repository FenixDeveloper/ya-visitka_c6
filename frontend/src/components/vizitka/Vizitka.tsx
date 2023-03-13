import { FC, useState, useEffect } from "react";
import styles from "./Vizitka.module.css";
import { IVizitka, VizitkaStyle } from "../../utils/types";
import telegram_logo from './telegram.svg';
import github_logo from './GitHub.svg';
import quotes_img from './quotes.svg';
import icon from "../../images/icons/comment.svg";
import VizitkaAboutBlock from "../vizitka-about-block/vizitka-about-block";
import derzkiy_img_style from './mask.png';
import CommentPost from '../comment-post/comment-post';
import { v4 as uuidv4 } from 'uuid';
import { getProfile, getProfiles, getReactions } from '../../utils/api'
import { useParams } from "react-router";


const Vizitka: FC<IVizitka> = (props) => {
  const { id } = useParams<{ id: string }>();
  const blocksTitle = ['Увлечения', 'Семья', 'Cфера', 'Yчеба']
  const [openPhotoComment, setOpenPhotoComment] = useState<boolean>(false);
  const [openQuoteComment, setOpenQuoteComment] = useState<boolean>(false);
  const [userPhoto, setUserPhoto] = useState<File | string>(props.image ?? '');

  const [reactions, setReactions] = useState<any>({
    data: null,
    isLoading: false,
    hasError: false,
  })

  const { data, isLoading, hasError } = reactions;

  useEffect(()=>{
    setReactions({...reactions, hasError: false, isLoading: true});
    getReactionsData();
  }, []);

  const getReactionsData = async() => {
    getReactions(id)
      .then(data => setReactions({ ...reactions, data: data, isLoading: false }))
      .catch(e => {
        setReactions({ ...reactions, hasError: true, isLoading: false });
      })}

  const getReactionsArray = (items: any, type: string | null) => {
    return items.filter((item: any) => item.target === type)
  }

  const getCommentsArray = (arr: any) => {
    const commentsArray: any[] = []
    arr.map((item: any) => commentsArray.push(item.text))
    return commentsArray
  }

  return (
    <section>
      {isLoading && "Загрузка ..."}
      {hasError && "Ошибка"}
      {!isLoading && !hasError && reactions && reactions.data && reactions.data.items &&
      <>
      <ul className={styles.mainBlocks}>
        <li className={styles.nameBlock} key={uuidv4()}>
          <p className={styles.name}>
            {props.name}
          </p>
          <p className={styles.city}>
            {props.city}
          </p>
          <div className={styles.logoBlock}>
          <a href={props.telegram}>
            <img src={telegram_logo} alt='Лого telegram' className={styles.logo} />
          </a>
          <a href={props.github}>
            <img src={github_logo} alt='Лого GitHun' className={styles.logo} />
          </a>
          </div>
        </li>
        <li className={styles.imageBlock} key={uuidv4()}>
          <div onClick={() => { setOpenPhotoComment(!openPhotoComment) }}>
            {props.photo_comments_number !== 0 && (
              <div className={`${styles.comments_number} ${openPhotoComment ? styles.showComments : ''}`}>{props.photo_comments_number}</div>
            )}
            <img src={icon} className={`${styles.icon} ${openPhotoComment ? styles.showComments : ''}`} alt="Иконка комментариев" />
          </div>
          {openPhotoComment && (
            <div className={styles.comment}>
              <CommentPost
                // comments={['Комментарий 1', 'Комментарий 2', 'Комментарий 3', 'Комментарий 4', 'Комментарий 4', 'Комментарий 4','Комментарий 4', 'Комментарий 4']}
                comments={getCommentsArray(getReactionsArray(reactions.data.items, null))}
                emojies={[{ type: '', count: 3 }]}
                class={false}
              />
            </div>
          )}
          {props.style === VizitkaStyle.Derzkiy ? 
          <div  className={styles.mask}>
            <img className={styles.image1} src={derzkiy_img_style} alt='Фото персоны' />
            <img className={styles.image} src={typeof props.image ==="string" ? props.image : URL.createObjectURL(props.image)} alt='Маска' />
          </div> : 
          <img src={typeof props.image ==="string" ? props.image : URL.createObjectURL(props.image)} alt='Фото персоны' className={`${props.style === VizitkaStyle.Romantic ? styles.imageRomantic : styles.image} ${openPhotoComment ? styles.showBorder : ''}`}/>}
        </li>
        <li className={styles.quotesBlock} key={uuidv4()}>
          <div className={styles.quotes_comments_block} onClick={() => { setOpenQuoteComment(!openQuoteComment) }}>
            {props.quotes_comments_number !== 0 && (
              <div className={`${styles.comments_number_block} ${openQuoteComment ? styles.showComments : ''}`}>{props.photo_comments_number}</div>
            )}
            <img src={icon} className={`${styles.icon_block} ${openQuoteComment ? styles.showComments : ''}`} alt="Иконка комментариев" />
          </div>
          {openQuoteComment && (
            <div className={styles.comment}>
              <CommentPost
                // comments={['Комментарий 1', 'Комментарий 2', 'Комментарий 3', 'Комментарий 4', 'Комментарий 4', 'Комментарий 4','Комментарий 4', 'Комментарий 4']}
                emojies={[{ type: '', count: 3 }]}
                comments={getCommentsArray(getReactionsArray(reactions.data.items, 'quote'))}
                class={true}
              />
            </div>
          )}
          <svg width="62" height="45" viewBox="0 0 62 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className={openQuoteComment ? styles.quoteActive : ''} d="M12.859 23.8142L12.9521 24.4566H13.6013H24.7402V44.25H0.816176V23.7066V23.6655L0.81169 23.6247C0.198168 18.0406 3.90712 5.34774 24.7402 0.918908V8.64234C22.4304 9.2679 19.3294 10.6318 16.8538 12.897C14.139 15.3809 12.1576 18.9751 12.859 23.8142Z" stroke="#100C34" strokeWidth="1.5"/>
<path className={openQuoteComment ? styles.quoteActive : ''} d="M48.5455 23.8142L48.6387 24.4566H49.2878H60.4267V44.25H36.5027V23.7066V23.6655L36.4982 23.6247C35.8847 18.0406 39.5936 5.34774 60.4267 0.918908V8.64234C58.1169 9.2679 55.016 10.6318 52.5403 12.897C49.8256 15.3809 47.8441 18.9751 48.5455 23.8142Z" stroke="#100C34" strokeWidth="1.5"/>
</svg>
          <p className={`${styles.quotes} ${openQuoteComment ? styles.quoteActive : ''}`}>
            {props.quotes}
          </p>
        </li>
      </ul>
       <ul className={styles.blocks}>
        {blocksTitle.map((item, index) => (
          <li className={styles.block} key={uuidv4()}>
            {item === 'Увлечения' ? 
            <VizitkaAboutBlock 
            title = {'Увлечения'}
            comments_number = {props.hobby_comments_number}
            img={props.hobby_img}
            description={props.hobby}
            style={props.style}
            reactionsArray={getCommentsArray(getReactionsArray(reactions.data.items, 'hobby'))}
            />
            : ''}
            {item === 'Семья' ? 
            <VizitkaAboutBlock 
            title = {'Семья'}
            comments_number = {props.family_comments_number}
            img={props.family_img}
            description={props.family}
            style={props.style}
            reactionsArray={getCommentsArray(getReactionsArray(reactions.data.items, 'status'))}
            />
            : ''}
            {item === 'Cфера' ? 
            <VizitkaAboutBlock 
            title = {'Cфера'}
            comments_number = {props.activity_comments_number}
            description={props.activity}
            style={props.style}
            reactionsArray={getCommentsArray(getReactionsArray(reactions.data.items, 'job'))}
            />
            : ''}
            {item === 'Yчеба' ? 
            <VizitkaAboutBlock 
              title = {'Yчеба'}
              comments_number = {props.studies_comments_number}
              description={props.studies}
              style={props.style}
              reactionsArray={getCommentsArray(getReactionsArray(reactions.data.items, 'edu'))}
            />
            : ''}
          </li> 
        ))}
      </ul>
    </>}
    </section>
  );
};
export default Vizitka;