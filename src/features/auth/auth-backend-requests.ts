import { Requests, get, post } from 'features/app/api/request';

const auth = process.env.BACKEND_AUTH_URL;

const requests = <Requests>{
  login: (p, e = {}) => post(`${auth}/login`, p, e),
  user_profile_get: (p, e) => get(`${auth}/users/${p.uid}/profile`, e),
};

export default requests;
