import { useState, useMemo, useEffect, useRef, FC } from 'react';
import { YMaps, withYMaps } from '@pbe/react-yandex-maps';
import arrow from '../../images/icons/arrow.svg';
import styles from './search-box.module.css';

function MapSuggestComponent(props: any) {
  const { ymaps } = props;
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<any>(null);

  const handlerClick = (index: number) => {
    props.setState(props.listDefaultCities[index])
    inputRef.current.value = props.listDefaultCities[index];
  }

  useEffect(() => {
    const suggestView = new ymaps.SuggestView('suggest');
    suggestView.events.add('select', function (e:any) {

      if(e.get('item').value !==""){
        props.setStateError(false);
      }
      props.setState( e.get('item').value );

});
  }, [ymaps.SuggestView]);

  return (
    <div>
      <p className={styles.text}>Выберите город *</p>
      <div
        className={styles.inputContainer}
      >
        <input type="text" id="suggest" className={`${styles.input} ${open && styles.input_open}`} ref={inputRef} />
        <img
          src={arrow}
          className={`${styles.arrow} ${open && styles.arrow_open} `}
          alt="Стрелка выпадающего списка"
          onClick={() => {
            setOpen(!open);
          }}
        />
        {open && (
          <ul className={styles.menu}>
            {props.listDefaultCities.map((item:string, index:number) => (
              <li className={styles.option} key={index} onClick={() => handlerClick(index)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
interface ISearchBox {
  setState: any,
  listDefaultCities: string[],
  setStateError: any
}
export const SearchBox:FC<ISearchBox> = ({
  setState,
  listDefaultCities,
  setStateError
}) => {
  const SuggestComponent = useMemo(() => {
    return withYMaps((props)=>MapSuggestComponent({...props, setState, listDefaultCities, setStateError}), true, [
      'SuggestView',
      'geocode',
      'coordSystem.geo',
    ]);
  }, [setState, setStateError]);

  return (
    <YMaps query={{ lang: 'en_RU' }}>
      <SuggestComponent />
    </YMaps>
  );
};
