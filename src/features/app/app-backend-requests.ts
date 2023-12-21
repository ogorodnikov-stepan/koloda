import { Requests, get } from 'features/app/api/request';

const locales = process.env.LOCALES_URL;

const requests = <Requests>{
  languages_get: (_, e = {}) => get(`${locales}/languages.json`, e),
};

export default requests;
