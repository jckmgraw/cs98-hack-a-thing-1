import axios from 'axios';
import {
  setFetchStatus,
  resetWeatherData,
  setWeatherData,
} from './weatherSlice';
import ENV from '../../env';

// https://openweathermap.org/current
export const fetchWeather = (location) => (dispatch) => {
  const url = `http://${ENV.API_URL}q=${location}&units=${ENV.API_UNITS}&appid=${ENV.API_KEY}`;
  console.log(`url: ${url}`);
  axios({
    method: 'get',
    url,
    timeout: 4000,
  })
    .then((res) => {
      console.log(`response: ${JSON.stringify(res.data)}`);
      const { name, coord, main, wind } = res.data;
      const { lon, lat } = coord;
      const { temp, feels_like, temp_min, temp_max, humidity } = main;
      const { speed } = wind;
      const data = {
        name,
        longitude: lon,
        latitude: lat,
        temp,
        tempFeelsLike: feels_like,
        tempMin: temp_min,
        tempMax: temp_max,
        humidity,
        windSpeed: speed,
      };
      dispatch(setFetchStatus(ENV.STATUS_RECEIVED));
      dispatch(setWeatherData(data));
    })
    .catch((error) => {
      console.log(`error: ${error}`);
      dispatch(setFetchStatus(ENV.STATUS_ERROR));
      dispatch(resetWeatherData());
    });
};
