// import React, { useEffect } from 'react';

// import { useState, useMemo } from 'react';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import Map, { Marker, NavigationControl } from 'react-map-gl';
// import styles from './TopPage.module.scss';
// import { shelterRepository } from '@/libs/repository/firebase';
// import { onScroll } from '@/hooks/useScroll';

// type Pin = {
//   title: string;
//   score: number;
//   address: string;
//   longitude: number;
//   latitude: number;
// };

// const renderStars = (rating: number) => {
//   const fullStars = Math.floor(Math.max(0, rating)); // Ensure rating is at least 0
//   const halfStar = rating % 1 !== 0 ? 1 : 0;
//   const emptyStars = Math.max(0, 5 - fullStars - halfStar); // Ensure emptyStars is not negative

//   return (
//     <div className={styles.stars}>
//       {[...Array(fullStars)].map((_, i) => (
//         <span key={i} className={styles.fullStar}>
//           ★
//         </span>
//       ))}
//       {halfStar === 1 && <span className={styles.halfStar}>☆</span>}
//       {[...Array(emptyStars)].map((_, i) => (
//         <span key={i} className={styles.emptyStar}>
//           ☆
//         </span>
//       ))}
//     </div>
//   );
// };

// const TopPage: React.FC = () => {
//   const [pinList, setPinList] = useState<Pin[]>([]);
//   const [popupInfo, setPopupInfo] = useState<Pin | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const fetchedShelter = await shelterRepository.list();

//       const pinsData: Pin[] = await Promise.all(
//         fetchedShelter.map(async (shelter) => {
//           return {
//             title: shelter.name,
//             score: shelter.score,
//             address: shelter.address,
//             latitude: shelter.coordinates.latitude,
//             longitude: shelter.coordinates.longitude,
//           };
//         }),
//       );

//       setPinList(pinsData);
//     };

//     fetchData();
//   }, []);

//   const pins = useMemo(
//     () =>
//       pinList.map((data, index) => (
//         <Marker
//           key={`marker-${index}`}
//           longitude={data.longitude}
//           latitude={data.latitude}
//           anchor='bottom'
//           onClick={(e) => {
//             e.originalEvent.stopPropagation();
//             setPopupInfo(data);
//             onScroll('container', 'bottom');
//           }}
//         />
//       )),
//     [pinList],
//   );

//   return (
//     <div className={styles.container}>
//       <div className={styles.title}>避難所マップ</div>
//       <div className={styles.mapContainer}>
//         <Map
//           initialViewState={{
//             longitude: 139.76711,
//             latitude: 35.68074,
//             zoom: 12,
//           }}
//           style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
//           mapStyle='mapbox://styles/mapbox/streets-v12'
//           mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
//         >
//           {pins}
//           <NavigationControl />
//         </Map>
//       </div>

//       <div id='container' className={styles.contentWrapper}>
//         <div className={styles.infoTitle}>避難所情報</div>
//         <p className={styles.subTitle}>備蓄の充実度合いが評価になります</p>
//         <div className={styles.redFrameContainer}>
//           <div className={styles.frameContent}>
//             <div className={styles.name}>
//               {popupInfo ? popupInfo.title : '未選択'}
//             </div>
//             <div className={styles.starsContainer}>
//               <div>評価</div>
//               {popupInfo ? renderStars(popupInfo.score) : '-'}
//               <div>{popupInfo ? popupInfo.score : ''}</div>
//             </div>
//             <div className={styles.address}>
//               住所：{popupInfo ? popupInfo.address : '未選択'}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopPage;
import React, { useEffect, useState, useMemo } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl';
import styles from './TopPage.module.scss';
import { shelterRepository } from '@/libs/repository/firebase';
// import { fetchGeocode } from '@/libs/services/getCoordinate';

type Pin = {
  title: string;
  score: number;
  address: string;
  longitude: number;
  latitude: number;
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(Math.max(0, rating));
  const halfStar = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = Math.max(0, 5 - fullStars - halfStar);

  return (
    <div className={styles.stars}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className={styles.fullStar}>
          ★
        </span>
      ))}
      {halfStar === 1 && <span className={styles.halfStar}>☆</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={i} className={styles.emptyStar}>
          ☆
        </span>
      ))}
    </div>
  );
};

// Haversine formula to calculate the distance between two coordinates
// const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
//   const R = 6371; // Earth radius in km
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon1 - lon2) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in km
// };

const TopPage: React.FC = () => {
  const [pinList, setPinList] = useState<Pin[]>([]);
  const [popupInfo, setPopupInfo] = useState<Pin | null>(null);
  // const [inputAddress, setInputAddress] = useState('');
  // const [inputLocation, setInputLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  // const [topShelters, setTopShelters] = useState<Pin[]>([]);
  // const [searchClicked, setSearchClicked] = useState(false); // State to track if search was clicked

  useEffect(() => {
    const fetchData = async () => {
      const fetchedShelter = await shelterRepository.list();

      const pinsData: Pin[] = await Promise.all(
        fetchedShelter.map(async (shelter) => {
          return {
            title: shelter.name,
            score: shelter.score,
            address: shelter.address,
            latitude: shelter.coordinates.latitude,
            longitude: shelter.coordinates.longitude,
          };
        }),
      );

      setPinList(pinsData);
    };

    fetchData();
  }, []);

  // const handleSearch = async () => {
  //   if (inputAddress) {
  //     const { latitude, longitude } = await fetchGeocode(inputAddress, 'JP', 'ja', import.meta.env.VITE_MAPBOX_TOKEN);
  //     setInputLocation({ latitude, longitude });
  //     setSearchClicked(true); // Set searchClicked to true when search is performed
  //   }
  // };

  // useEffect(() => {
  //   if (inputLocation) {
  //     const sheltersWithin5Km = pinList.filter((pin) => {
  //       const distance = haversineDistance(inputLocation.latitude, inputLocation.longitude, pin.latitude, pin.longitude);
  //       return distance <= 5; // Filter shelters within 5 km
  //     });

  //     const sortedShelters = sheltersWithin5Km.sort((a, b) => b.score - a.score); // Sort by score
  //     setTopShelters(sortedShelters.slice(0, 5)); // Take the top 5
  //   }
  // }, [inputLocation, pinList]);

  const pins = useMemo(
    () =>
      pinList.map((data, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={data.longitude}
          latitude={data.latitude}
          anchor='bottom'
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(data);
          }}
        >
          {popupInfo?.title === data.title && (
            <Popup
              longitude={data.longitude}
              latitude={data.latitude}
              anchor="top"
              closeOnClick={false}
              onClose={() => setPopupInfo(null)}
              className={styles.popup}
            >
              <div>
                <h4>{data.title}</h4>
                <p>評価: {renderStars(data.score)}</p>
                <p>住所: {data.address}</p>
              </div>
            </Popup>
          )}
        </Marker>
      )),
    [pinList, popupInfo],
  );

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <Map
          initialViewState={{
            longitude: 139.76711,
            latitude: 35.68074,
            zoom: 12,
          }}
          style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
          mapStyle='mapbox://styles/mapbox/streets-v12'
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        >
          {pins}
          <NavigationControl />
        </Map>
      </div>
      {/* <div className={styles.title}>避難所マップ</div>
      <input
        type="text"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
        placeholder="住所を入力してください"
      />
      <button onClick={handleSearch}>検索</button> */}

      {/* {searchClicked && topShelters.length > 0 && (
        <div className={styles.topShelters}>
          <h3>Top 5 Shelters within 5km</h3>
          {topShelters.map((shelter, index) => (
            <div key={index} className={styles.shelterInfo}>
              <div className={styles.shelterCard}>
                <h4>{shelter.title}</h4>
                <p>評価: {shelter.score}</p>
                <p>住所: {shelter.address}</p>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default TopPage;
