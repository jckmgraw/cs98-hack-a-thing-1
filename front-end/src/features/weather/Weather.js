import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectHumidity,
  selectLatitude,
  selectLongitude,
  selectName,
  selectTemp,
  selectTempFeelsLike,
  selectTempMax,
  selectTempMin,
  selectWindSpeed,
} from './weatherSlice';
import styles from './Weather.module.scss';

const Row = (props) => {
  const { title, data } = props;
  return (
    <div className={styles.row}>
      <div className={styles.title}>{title}</div>
      <div className={styles.data}>{data}</div>
    </div>
  );
};

const Weather = () => {
  const name = useSelector(selectName);
  const longitude = useSelector(selectLongitude);
  const latitude = useSelector(selectLatitude);
  const temp = useSelector(selectTemp);
  const tempFeelsLike = useSelector(selectTempFeelsLike);
  const tempMin = useSelector(selectTempMin);
  const tempMax = useSelector(selectTempMax);
  const humidity = useSelector(selectHumidity);
  const windSpeed = useSelector(selectWindSpeed);

  return (
    <div>
      <Row title="Name" data={name} />
      <Row title="Longitude" data={longitude} />
      <Row title="Latitude" data={latitude} />
      <Row title="Temperature" data={temp} />
      <Row title="Feels Like" data={tempFeelsLike} />
      <Row title="Min Temp" data={tempMin} />
      <Row title="Max Temp" data={tempMax} />
      <Row title="Humidity" data={humidity} />
      <Row title="Wind Speed" data={windSpeed} />
    </div>
  );
};

export default Weather;
