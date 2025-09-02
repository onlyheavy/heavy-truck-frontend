const MODE = process.env.NEXT_PUBLIC_API_MODE || 'LIVE'; // LOCAL, LIVE, WIFI
console.log('Current API Mode:', MODE);
console.log('Raw env value:', process.env.NEXT_PUBLIC_API_MODE);
const API = {};

API.MODE = MODE;

// Starting the App
if (MODE === 'LOCAL') API.HOST = 'http://localhost:8000';
if (MODE === 'WIFI') API.HOST = 'http://192.168.1.17:8000';
if (MODE === 'LIVE') API.HOST = 'https://api.onlyheavy.com';

export default API;
