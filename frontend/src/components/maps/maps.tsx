import { YMaps, useYMaps } from '@pbe/react-yandex-maps';
import styles from './maps.module.css';
import markerMapImg from '../../images/icons/markerMap.svg';
import avaTest from '../../images/icons/ava.jpg';
import { useEffect, useRef, useState } from 'react';
import { IMapProps, IUserInfo } from '../../utils/types';
import { getProfiles } from '../../utils/api';
const testData: IUserInfo[] = [
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
        geocode: [59.863234, 30.168894],
      },
    },
  },
  {
    _id: '2cb3baaa5685a9bb5e2c20d9',
    createdAt: 1669314103678,
    updatedAt: null,
    email: 'Reymundo67.Harvey@hotmail.com',
    cohort: 'web+16',
    profile: {
      name: 'Мария',
      photo: 'https://loremflickr.com/640/480/cats',
      city: {
        name: 'Санкт-Петербург',
        geocode: [58.864321, 34.169111],
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
        geocode: [44.686673, 37.697532],
      },
    },
  },
  {
    _id: 'a18ca3c1e13dd93ddded5lkd',
    createdAt: 1647633379645,
    updatedAt: null,
    email: 'Caden89@yahoo.com',
    cohort: 'web+16',
    profile: {
      name: 'Yuriy',
      photo: 'https://loremflickr.com/640/480/cats',
      city: {
        name: 'Тула',
        geocode: [54.193122, 37.617348],
      },
    },
  },
];

function MyMap({
  data = testData,
  centerMap = [55.959183, 76.10165],
  zoomMap = 10,
  balloonImg = markerMapImg,
}: IMapProps) {
  const mapRef = useRef(null);
  const ymaps = useYMaps(['Map']);
  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }
    const map = new ymaps.Map(mapRef.current, {
      center: centerMap,
      zoom: zoomMap,
    });

    const placemarks = data.map((user) => {
      return new ymaps.Placemark(
        user.profile.city.geocode,
        {
          balloonContentHeader: user.profile.name,
          balloonContentBody: `<a class=${styles.balloonBody} href='/vizitka/${user._id}' >Посмотреть профиль</a>`,
          balloonContentFooter: user.profile.city.name,
        },
        {
          iconLayout: ymaps.templateLayoutFactory.createClass(`<div class=${
            styles.markerInfoContainer
          }>
          <img class=${styles.marker} src=${markerMapImg} alt=''/>
               <div class=${styles.markerContainer}>
                 <div class=${styles.markerHeaderContainer}>
                    <img class=${styles.markerAva} src=${
            user.profile.photo ?? avaTest
          } alt='Аватарка'/>
                    <h1 class=${styles.markerHeader}>${user.profile.name}</h1>
                 </div>
                 <p class=${styles.markerPlace}>${user.profile.city.name}</p>
               </div>
             </div>`),
          iconOffset: [-30, -65],
          iconShape: {
            type: 'Rectangle',
            //@ts-ignore
            coordinates: [
              [5, 5],
              [216, 68],
            ],
          },
          openEmptyBalloon: false,
        },
      );
    });

    const clusterer = new ymaps.Clusterer({
      // @ts-ignore
      clusterDisableClickZoom: true,
      preset: 'islands#redClusterIcons',
      hasBalloon: false,
    });

    placemarks.forEach((placemark) => {
      clusterer.add(placemark);
    });

    // @ts-ignore
    map.geoObjects.add(clusterer);

    // @ts-ignore
    map.setBounds(clusterer.getBounds(), {
      checkZoomRange: true,
    });
  }, [balloonImg, centerMap, data, ymaps, zoomMap]);

  return (
    <>
      <div ref={mapRef} className={styles.map} />
    </>
  );
}

export default function Maps({
  data,
  centerMap,
  zoomMap,
  balloonImg,
}: IMapProps) {

  const [dataUsers, setDataUsers] = useState<Array<IUserInfo>>([]);
  useEffect(() => {
    getProfiles().then((res: { items: Array<IUserInfo> }) => {
      const sortedData = res.items.filter(
        (user) => user.profile.city.name != undefined,
      );
      setDataUsers(sortedData);
    console.log(sortedData)
    });
  }, []);

  return (
    <YMaps query={{ load: 'package.full', apikey: '<KEY>' }}>
      <MyMap
        data={dataUsers}
        centerMap={centerMap}
        zoomMap={zoomMap}
        balloonImg={balloonImg}
      />
    </YMaps>
  );
}