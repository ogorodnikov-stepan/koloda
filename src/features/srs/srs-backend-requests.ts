import { Requests, get, post, put, del, qs } from 'features/app/api/request';

const srs = process.env.BACKEND_SRS_URL;
const locales = process.env.LOCALES_URL;
// const base = 'http://localhost/api/srs';
// const front = 'http://localhost';

const requests = <Requests>{
  subjects_get: (p, e = {}) => get(`${locales}/${p.language}/srs-subjects.json`, e),
  languages_get: (p, e = {}) => get(`${locales}/${p.language}/srs-languages.json`, e),
  reppings_get: (_, e = {}) => get(`${srs}/reppings`, e),
  repping_add: (p, e = {}) => post(`${srs}/reppings`, p, e),
  repping_get: (p, e = {}) => get(`${srs}/reppings/${p.id}`, e),
  repping_update: (p, e = {}) => put(`${srs}/reppings/${p.id}`, p, e),
  repping_delete: (p, e = {}) => del(`${srs}/reppings/${p.id}`, e),
  divels_update: (p, e = {}) => put(`${srs}/reppings/${p.repping_id}/divels`, p, e),
  divel_get: (p, e = {}) => get(`${srs}/reppings/${p.repping_id}/divels/${p.id}`, e),
  divel_update: (p, e = {}) => put(`${srs}/reppings/${p.repping_id}/divels/${p.id}`, p, e),
  decks_get: (_, e = {}) => get(`${srs}/decks`, e),
  deck_add: (p, e = {}) => post(`${srs}/decks`, p, e),
  deck_get: (p, e = {}) => get(`${srs}/decks/${p.id}`, e),
  deck_update: (p, e = {}) => put(`${srs}/decks/${p.id}`, p, e),
  deck_delete: (p, e = {}) => del(`${srs}/decks/${p.id}`, e),
  fields_get: (p, e = {}) => get(`${srs}/decks/${p.deck_id}/fields`, e),
  fields_set: (p, e = {}) => put(`${srs}/decks/${p.deck_id}/fields`, p, e),
  cards_get: (p, e = {}) => get(`${srs}/decks/${p.deck_id}/cards`, e),
  cards_set: (p, e = {}) => put(`${srs}/decks/${p.deck_id}/cards`, p, e),
  learnings_get: (p, e = {}) => get(`${srs}/learnings${qs(p)}`, e),
  learning_add: (p, e = {}) => post(`${srs}/learnings`, p, e),
  learning_get: (p, e = {}) => get(`${srs}/learnings/${p.deck_id}`, e),
  learning_update: (p, e = {}) => put(`${srs}/learnings/${p.deck_id}`, p, e),
  learning_delete: (p, e = {}) => del(`${srs}/learnings/${p.deck_id}`, e),
  lesson_get: (p, e = {}) => get(`${srs}/lessons/${p.type}${qs(p, ['deck_id', 'limit'])}`, e),
  lesson_deck_get: (p, e = {}) => get(`${srs}/lessons/${p.type}/decks/${p.id}${qs(p, ['limit'])}`, e),
  lesson_repping_get: (p, e = {}) => get(`${srs}/reppings/${p.id}`, e),
  lesson_results_set: (p, e = {}) => put(`${srs}/results`, p, e),
  // learnings_meta_get: (_, e = {}) => get(`${srs}/meta/learnings`, e),
};

export default requests;
