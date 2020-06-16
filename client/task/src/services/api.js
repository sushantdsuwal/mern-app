import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

http.interceptors.response.use(
  (response) => {
    if (response && response.data && response.data.jwtToken) {
      window.localStorage.setItem('jwtToken', response.data.jwtToken);
    }
    return response;
  },
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      window.localStorage.removeItem('jwtToken');
      window.location.pathname = '/';
    }
    return Promise.reject(error);
  }
);

http.interceptors.request.use((config) => {
  if (!!window.localStorage.getItem('jwtToken'))
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('jwtToken');
  return config;
});

export const get = ({ url }) => http.get(url);

export const post = ({ url, data }) => http.post(url, data);

export const put = ({ url, data }) => http.put(url, data);

export const del = (url) => http.delete(url);

export const patch = ({ url, data }) => http.patch(url, data);
