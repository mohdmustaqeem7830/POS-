import axios from 'axios';

const api = axios.create({
  baseURL: 'https://postbackend-2-5t5a.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});




export default api;
