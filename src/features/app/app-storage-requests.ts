/* eslint-disable @typescript-eslint/naming-convention */
import { db } from 'config/db';
import { Requests, get } from 'features/app/api/request';

const locales = process.env.LOCALES_URL;

const requests = <Requests>{
  languages_get: (_, e = {}) => get(`${locales}/languages.json`, e),
  demo_clear,
  demo_get: ({ language }, e = {}) => get(`${locales}/${language}/demo/demo.json`, e),
  demo_repping_get: ({ language, name }, e = {}) => get(`${locales}/${language}/demo/reppings/${name}.json`, e),
  demo_deck_get: ({ language, name }, e = {}) => get(`${locales}/${language}/demo/decks/${name}.json`, e),
};

async function demo_clear() {
  await Promise.all([
    db.users.clear(),
    db.reppings.clear(),
    db.decks.clear(),
    db.cards.clear(),
  ]);

  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({}),
  });
}

export default requests;
