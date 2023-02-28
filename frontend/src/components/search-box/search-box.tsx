import { useState, useMemo, useEffect } from 'react';
import { YMaps, withYMaps } from '@pbe/react-yandex-maps';
import arrow from '../../images/icons/arrow.svg';
import styles from './search-box.module.css';

function MapSuggestComponent(props: any) {
  const { ymaps } = props;
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const suggestView = new ymaps.SuggestView('suggest');
  }, [ymaps.SuggestView]);

  return (
    <div>
      <p className={styles.text}>Выберите город *</p>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className={styles.inputContainer}
      >
        <input type="text" id="suggest" className={styles.input} />
        <img
          src={arrow}
          className={`${styles.arrow} ${open && styles.arrow_open} `}
          alt="Стрелка выпадающего списка"
        />
      </div>
    </div>
  );
}

export const SearchBox = () => {
  const SuggestComponent = useMemo(() => {
    return withYMaps(MapSuggestComponent, true, [
      'SuggestView',
      'geocode',
      'coordSystem.geo',
    ]);
  }, []);

  return (
    <YMaps query={{ lang: 'en_RU' }}>
      <SuggestComponent />
    </YMaps>
  );
};
