import axios from 'axios';
import ENV from '../../env';

// https://openweathermap.org/current
export const fetchWeather = (location) => (dispatch) => {
  const url = `${ENV.API_URL}q=${location}&units=${ENV.API_UNITS}&appid=${ENV.API_KEY}`;
  console.log(`url: ${url}`);
  axios({
    method: 'get',
    url,
    timeout: 4000,
  })
    .then((res) => {
      console.log(`response: ${res}`);
    })
    .catch((error) => {
      console.log(`error: ${error}`);
    });
};
