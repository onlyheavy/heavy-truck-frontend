const MODE = import.meta.env.VITE_API_MODE || 'LIVE'; // LOCAL, WIFI, TEST, STAGE, LIVE

let baseURL = '';

if (MODE === 'LOCAL') baseURL = 'http://localhost:8000';
if (MODE === 'WIFI') baseURL = 'http://192.168.1.10:8000';
if (MODE === 'TEST') baseURL = 'https://api-test.ficodo.com';
if (MODE === 'STAGE') baseURL = 'http://13.127.222.190';
if (MODE === 'LIVE') baseURL = 'https://api.ficodo.com';

const API = {
  baseURL,
};

export default API;
