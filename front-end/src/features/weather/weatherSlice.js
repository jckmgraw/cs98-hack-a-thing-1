import { createSlice } from '@reduxjs/toolkit';
import ENV from '../../env';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    fetchStatus: ENV.STATUS_IDLE,
    name: '',
    longitude: '',
    latitude: '',
    temp: '',
    tempFeelsLike: '',
    tempMin: '',
    tempMax: '',
    humidity: '',
    windSpeed: '',
  },
  reducers: {
    setWeatherData: (state, action) => {
      const {
        name,
        longitude,
        latitude,
        temp,
        tempFeelsLike,
        tempMin,
        tempMax,
        humidity,
        windSpeed,
      } = action.payload;
      state.name = name;
      state.longitude = longitude;
      state.latitude = latitude;
      state.temp = temp;
      state.tempFeelsLike = tempFeelsLike;
      state.tempMin = tempMin;
      state.tempMax = tempMax;
      state.humidity = humidity;
      state.windSpeed = windSpeed;
    },
    resetWeatherData: (state) => {
      state.name = '';
      state.longitude = '';
      state.latitude = '';
      state.temp = '';
      state.tempFeelsLike = '';
      state.tempMin = '';
      state.tempMax = '';
      state.humidity = '';
      state.windSpeed = '';
    },
    setFetchStatus: (state, action) => {
      state.fetchStatus = action.payload;
    },
  },
});

export const {
  setWeatherData,
  resetWeatherData,
  setFetchStatus,
} = weatherSlice.actions;

export const selectFetchStatus = (state) => state.weather.fetchStatus;

export const selectName = (state) => state.weather.name;
export const selectLongitude = (state) => state.weather.longitude;
export const selectLatitude = (state) => state.weather.latitude;
export const selectTemp = (state) => state.weather.temp;
export const selectTempFeelsLike = (state) => state.weather.tempFeelsLike;
export const selectTempMin = (state) => state.weather.tempMin;
export const selectTempMax = (state) => state.weather.tempMax;
export const selectHumidity = (state) => state.weather.humidity;
export const selectWindSpeed = (state) => state.weather.windSpeed;

export default weatherSlice.reducer;
