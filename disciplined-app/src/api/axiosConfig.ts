import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Backend port
  // baseURL: 'http://192.168.1.165:4000', 
});

export default api;


