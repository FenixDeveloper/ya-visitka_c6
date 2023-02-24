import { YMaps, Map, Placemark, useYMaps } from '@pbe/react-yandex-maps';
import styles from './maps.module.css';
import ballonImg from '../../images/icons/balloon.svg';
import avaTest from '../../images/icons/ava.jpg';
import { useEffect, useRef } from 'react';

function MyMap() {
  const mapRef = useRef(null);
  const ymaps = useYMaps(['Map']);
  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }
    const map = new ymaps.Map(mapRef.current, {
      center: [55.76, 37.64],
      zoom: 4,
    });

    const placemark = new ymaps.Placemark(
      [59.94, 30.3],
      {},
      {
        iconLayout: 'default#image',
        iconImageSize: [50, 50],
        iconImageHref: ballonImg,
        balloonLayout: ymaps.templateLayoutFactory.createClass(
          `<div class=${styles.balloonContainer}>
          <div class=${styles.balloonHeaderContainer}>
           <img class=${styles.balloonAva} src=${avaTest} alt='Аватарка'/>
           <h1 class=${styles.balloonHeader}>Иванов Сергей</h1>
           </div>
           <p class=${styles.balloonPlace}>Пермь</p>
            </div>`
        ),
        hideIconOnBalloonOpen: false,
        balloonOffset: [35, -45],
        openBalloonOnClick: false,
      }
    );

    map.geoObjects.add(placemark);
    placemark.balloon.open();
  }, [ymaps]);

  return (
    <>
      <div ref={mapRef} className={styles.map} />
      <img src='' alt='' />
    </>
    // <YMaps query={{ load: 'package.full', apikey: '<KEY>' }}>
    //   <div>
    //     My awesome application with maps!
    //     <Map
    //       className={styles.map}
    //       defaultState={{
    //         center: [55.75, 37.57],
    //         zoom: 5,
    //         controls: ['zoomControl', 'fullscreenControl'],
    //       }}>
    //       <Placemark
    //         defaultGeometry={[59.94, 30.3]}
    //         properties={{
    //           balloonContentHeader: 'HEader balloon',
    //           balloonContentBody: 'Это Санкт-Петербург',
    //         }}
    //         options={{
    //           iconLayout: 'default#image',
    //           iconImageSize: [50, 50],
    //           iconImageHref: ballonImg,
    //           balloonAutoPan: true,
    //           balloonOffset: [70, -40],
    //           hideIconOnBalloonOpen: false,
    //           openEmptyBalloon: true,
    //         }}
    //       />
    //     </Map>
    //   </div>
    // </YMaps>
  );
}

export default function Maps() {
  return (
    <YMaps query={{ load: 'package.full', apikey: '<KEY>' }}>
      <MyMap />
    </YMaps>
  );
}
