import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFetchStatus,
  selectHumidity,
  selectLatitude,
  selectLongitude,
  selectName,
  selectTemp,
  selectTempFeelsLike,
  selectTempMax,
  selectTempMin,
  selectWindSpeed,
  setFetchStatus,
} from './weatherSlice';
import { fetchWeather } from './fetchWeather';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import styles from './Weather.module.scss';
import ENV from '../../env';

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
  const fetchStatus = useSelector(selectFetchStatus);
  const name = useSelector(selectName);
  const longitude = useSelector(selectLongitude);
  const latitude = useSelector(selectLatitude);
  const temp = useSelector(selectTemp);
  const tempFeelsLike = useSelector(selectTempFeelsLike);
  const tempMin = useSelector(selectTempMin);
  const tempMax = useSelector(selectTempMax);
  const humidity = useSelector(selectHumidity);
  const windSpeed = useSelector(selectWindSpeed);
  const dispatch = useDispatch();
  const [city, setCity] = useState('San Diego');

  let weatherData;
  if (fetchStatus === ENV.STATUS_IDLE) {
    weatherData = '';
  } else if (fetchStatus === ENV.STATUS_ERROR) {
    weatherData = <div>Whoops, something went wrong fetching data...</div>;
  } else if (fetchStatus === ENV.STATUS_WAITING) {
    weatherData = (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  } else if (fetchStatus === ENV.STATUS_RECEIVED) {
    weatherData = (
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
  }

  return (
    <div className={styles.container}>
      <div className={styles.weatherData}>{weatherData}</div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(setFetchStatus(ENV.STATUS_WAITING));
          dispatch(fetchWeather(city));
        }}
      >
        <TextField
          id="outlined-basic"
          label="City"
          variant="outlined"
          value={city}
          fullWidth={true}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          type="submit"
          variant="outlined"
          size="small"
          disabled={fetchStatus === ENV.STATUS_WAITING ? true : false}
        >
          Fetch Data
        </Button>
      </form>
    </div>
  );
};

export default Weather;
