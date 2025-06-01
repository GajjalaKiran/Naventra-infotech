// src/axiosConfig.js
import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: token ? token : '',
  },
});

export default instance;
