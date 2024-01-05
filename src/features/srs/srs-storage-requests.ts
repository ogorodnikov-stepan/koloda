/* eslint-disable @typescript-eslint/naming-convention */
import { v4 as uuid } from 'uuid';
import pick from 'lodash.pick';
import isFuture from 'date-fns/isFuture';
import { db } from 'config/db';
import { formatDateTime } from 'features/app/date/date';
import { Requests, get, HTTPParams } from 'features/app/api/request';
import { ManyParams, many } from 'features/app/api/storage';
import { Divel, Deck, Card, LessonCardResult, LessonDeckResult } from 'features/srs/srs-types';
import { REPPING_DEFAULT } from 'features/srs/reppings/reppings-defaults';
import { DECK_DEFAULT } from 'features/srs/decks/decks-defaults';
import { LESSON_INITIAL_TYPE, LESSON_LEARNING_TYPE } from 'features/srs/lessons/lessons-defaults';
import { getReppingEligibilityStatus } from 'features/srs/reppings/reppings-domain';
import { getDeckEligibilityStatus } from 'features/srs/decks/decks-domain';
import { LEARNING_SETTINGS } from 'features/srs/learnings/learnings-defaults';

const locales = process.env.LOCALES_URL;

const requests = <Requests>{
  subjects_get: (p, e = {}) => get(`${locales}/${p.language}/srs-subjects.json`, e),
  languages_get: (p, e = {}) => get(`${locales}/${p.language}/srs-languages.json`, e),
  reppings_get,
  repping_import,
  repping_export,
  repping_add,
  repping_get,
  repping_update,
  repping_delete,
  divels_update,
  divel_get,
  divel_update,
  decks_get,
  deck_import,
  deck_export,
  deck_add,
  deck_get,
  deck_update,
  deck_delete,
  fields_get,
  fields_set,
  cards_get,
  cards_set,
  learnings_get,
  learning_add,
  learning_get,
  learning_update,
  learning_delete,
  lesson_get,
  lesson_deck_get,
  lesson_repping_get,
  lesson_results_set,
};

async function reppings_get(params: ManyParams) {
  const { data, meta } = await many(db.reppings, params);

  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ data, meta }),
  });
}

async function repping_import(params: HTTPParams) {
  const createdAt = formatDateTime(new Date());
  const updatedAt = createdAt;
  const data = { ...REPPING_DEFAULT, id: uuid(), createdAt, updatedAt, ...params };
  const { isEligible, requirements } = getReppingEligibilityStatus(data);
  const id = await db.reppings.add({ ...data, isEligible, requirements });
  return Promise.resolve({
    ok: true,
    status: 201,
    json: () => ({ data: { id } }),
  });
}

async function repping_export({ id }: HTTPParams) {
  const repping = await db.reppings.get(id);
  if (!repping) return Promise.resolve({ ok: false, status: 404 });
  const properties = [
    'title', 'description', 'divels',
  ];
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => (pick(repping, properties)),
  });
}

async function repping_add(params: HTTPParams) {
  const createdAt = formatDateTime(new Date());
  const updatedAt = createdAt;
  const data = { ...REPPING_DEFAULT, id: uuid(), createdAt, updatedAt, ...params };
  const id = await db.reppings.add(data);
  return Promise.resolve({
    ok: true,
    status: 201,
    json: () => ({ data: { id } }),
  });
}

async function repping_get({ id }: HTTPParams) {
  const data = await db.reppings.get(id);
  return Promise.resolve(
    data
      ? { ok: true, status: 200, json: () => ({ data }) }
      : { ok: false, status: 404 },
  );
}

async function repping_update({ id, ...data }: HTTPParams) {
  const repping = await db.reppings.get(id);
  if (!repping) return Promise.resolve({ ok: false, status: 404 });
  const { isEligible, requirements } = getReppingEligibilityStatus(repping);
  const updatedAt = formatDateTime(new Date());
  await db.reppings.update(id, { ...data, isEligible, requirements, updatedAt });
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ ...repping, ...data, isEligible, updatedAt }),
  });
}

async function repping_delete({ id }: HTTPParams) {
  const repping = await db.reppings.get(id);
  if (!repping) return Promise.resolve({ ok: false, status: 404 });
  await db.reppings.delete(id);
  return Promise.resolve({ ok: true, status: 204, json: () => {} });
}

async function divels_update({ reppingId, divels }: HTTPParams) {
  const repping = await db.reppings.get(reppingId);
  if (!repping) return Promise.resolve({ ok: false, status: 404 });
  const data = divels.map((divel: Divel) => {
    const phases = divel.phases
      || repping.divels.find((x: Divel) => (x.id === divel.id))?.phases
      || [];
    return { ...divel, phases };
  });
  const { isEligible, requirements } = getReppingEligibilityStatus({ ...repping, divels: data });
  const updatedAt = formatDateTime(new Date());
  await db.reppings.update(reppingId, { divels: data, isEligible, requirements, updatedAt });
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ ...repping, divels: data, isEligible, requirements, updatedAt }),
  });
}

async function divel_get({ reppingId, id }: HTTPParams) {
  const repping = await db.reppings.get(reppingId);
  const data = repping?.divels.find((x: Divel) => (x.id === id));
  return Promise.resolve(
    data
      ? { ok: true, status: 200, json: () => ({ data }) }
      : { ok: false, status: 404 },
  );
}

async function divel_update({ reppingId, id, ...data }: HTTPParams) {
  const repping = await db.reppings.get(reppingId);
  if (!repping) return Promise.resolve({ ok: false, status: 404 });
  const divel = repping.divels.find((x: Divel) => (x.id === id));
  if (!divel) return Promise.resolve({ ok: false, status: 404 });
  const divels = repping.divels.map((x: Divel) => (
    (x.id === id) ? { ...x, ...data } : x
  ));
  const { isEligible, requirements } = getReppingEligibilityStatus({ ...repping, divels });
  const updatedAt = formatDateTime(new Date());
  await db.reppings.update(reppingId, { divels, isEligible, requirements, updatedAt });
  return Promise.resolve({ ok: true, status: 204, json: () => {} });
}

async function decks_get(params: ManyParams) {
  const { data, meta } = await many(db.decks, params);

  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ data, meta }),
  });
}

async function deck_import(params: HTTPParams) {
  const createdAt = formatDateTime(new Date());
  const updatedAt = createdAt;
  const startedAt = createdAt;
  const lastLearnedAt = createdAt;
  const learning = params.reppingId
    ? { startedAt, lastLearnedAt, isLearning: true, settings: LEARNING_SETTINGS }
    : {};
  const fieldsTotal = params.fields.length;
  const cardsTotal = params.cards.length;
  const data = {
    ...DECK_DEFAULT,
    id: uuid(),
    createdAt,
    updatedAt,
    fieldsTotal,
    cardsTotal,
    ...learning,
    ...params,
  };
  const { isEligible, requirements } = getDeckEligibilityStatus(data);
  const id = await db.decks.add({ ...data, isEligible, requirements });
  await cards_set({ deckId: id, cards: params.cards });
  return Promise.resolve({
    ok: true,
    status: 201,
    json: () => ({ data: { id } }),
  });
}

async function deck_export({ id }: HTTPParams) {
  const deck = await db.decks.get(id);
  if (!deck) return Promise.resolve({ ok: false, status: 404 });
  const cards = await db.cards.where({ deckId: id }).sortBy('index');
  deck.cards = cards.map((card) => (pick(card, ['id', 'content'])));
  const properties = [
    'title', 'description', 'categoryId', 'subjectId', 'languageId', 'fields', 'cards',
  ];
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => (pick(deck, properties)),
  });
}

async function deck_add(params: HTTPParams) {
  const createdAt = formatDateTime(new Date());
  const updatedAt = createdAt;
  const data = { ...DECK_DEFAULT, id: uuid(), createdAt, updatedAt, ...params };
  const id = await db.decks.add(data);
  return Promise.resolve({
    ok: true,
    status: 201,
    json: () => ({ data: { id } }),
  });
}

async function deck_get({ id }: HTTPParams) {
  const deck = await db.decks.get(id);
  if (!deck) return Promise.resolve({ ok: false, status: 404 });
  const { learning, ...data } = deck;
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ data }),
  });
}

async function deck_update({ id, ...data }: HTTPParams) {
  const deck = await db.decks.get(id);
  if (!deck) return Promise.resolve({ ok: false, status: 404 });
  const { isEligible, requirements } = getDeckEligibilityStatus(deck);
  const updatedAt = formatDateTime(new Date());
  await db.decks.update(id, { ...data, isEligible, requirements, updatedAt });
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ ...deck, ...data, isEligible, requirements, updatedAt }),
  });
}

async function deck_delete({ id }: HTTPParams) {
  const repping = await db.decks.get(id);
  if (!repping) return Promise.resolve({ ok: false, status: 404 });
  await db.decks.delete(id);
  await db.cards.where({ deckId: id }).delete();
  return Promise.resolve({ ok: true, status: 204, json: () => {} });
}

async function fields_get({ deckId }: HTTPParams) {
  const deck = await db.decks.get(deckId);
  if (!deck) return Promise.resolve({ ok: false, status: 404 });
  return Promise.resolve({ ok: true, status: 200, json: () => ({ data: deck.fields }) });
}

async function fields_set({ deckId, fields }: HTTPParams) {
  await db.decks.update(deckId, { fields });
  const deck = await db.decks.get(deckId);
  if (!deck) return Promise.resolve({ ok: false, status: 404 });
  const fieldsTotal = fields.length;
  const { isEligible, requirements } = getDeckEligibilityStatus({ ...deck, fieldsTotal });
  const updatedAt = formatDateTime(new Date());
  await db.decks.update(deckId, { isEligible, requirements, fieldsTotal, updatedAt });
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ ...deck, isEligible, requirements, fieldsTotal, updatedAt }),
  });
}

async function cards_get({ deckId }: HTTPParams) {
  const cards = await db.cards.where({ deckId }).sortBy('index');
  return Promise.resolve({ ok: true, status: 200, json: () => ({ data: cards }) });
}

async function cards_set({ deckId, cards }: HTTPParams) {
  const data = cards.map((card: Card, i: number) => (
    { ...card, pk: `${deckId}/${card.id}`, deckId, index: i }
  ));
  await db.cards.where({ deckId }).delete();
  await db.cards.bulkAdd(data);
  const deck = await db.decks.get(deckId);
  if (!deck) return Promise.resolve({ ok: false, status: 404 });
  const cardsTotal = cards.length;
  const { isEligible, requirements } = getDeckEligibilityStatus({ ...deck, cardsTotal });
  const updatedAt = formatDateTime(new Date());
  await db.decks.update(deckId, { isEligible, requirements, cardsTotal, updatedAt });
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ ...deck, isEligible, requirements, cardsTotal, updatedAt }),
  });
}

async function learnings_get(params: ManyParams) {
  const filters = { ...params.filters, isEligible: [true], isLearning: [true] };
  const { data, meta } = await many(db.decks, { ...params, filters });

  const decks = await Promise.all(data.map(async (deck) => {
    const initial = await db.cards
      .where({ deckId: deck.id })
      .filter(({ progress }) => (!progress?.dueAt && !progress?.isCompleted))
      .count();

    const learning = await db.cards
      .where({ deckId: deck.id })
      .filter(({ progress }) => (
        !!progress?.dueAt
        && !isFuture(new Date(progress.dueAt))
        && !progress?.isCompleted
      ))
      .count();

    return { id: deck.id, title: deck.title, initial, learning };
  }));

  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ data: decks, meta }),
  });
}

async function learning_add({ deckId, reppingId, ...data }: HTTPParams) {
  const deck = await db.decks.get(deckId);
  if (!deck) return Promise.resolve({ ok: false, status: 404 });
  if (!deck.isEligible || deck.reppingId) return Promise.resolve({ ok: false, status: 409 });
  const repping = await db.reppings.get(reppingId);
  if (!repping) return Promise.resolve({ ok: false, status: 404 });
  const isLearning = true;
  const startedAt = formatDateTime(new Date());
  const lastLearnedAt = formatDateTime(new Date());
  const settings = LEARNING_SETTINGS;
  const learning = { ...data, isLearning, reppingId, settings, startedAt, lastLearnedAt };
  await db.decks.update(deckId, learning);
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ deckId, repping, settings, startedAt, lastLearnedAt }),
  });
}

async function learning_get({ deckId }: HTTPParams) {
  const deck = await db.decks.get(deckId);
  if (!deck?.reppingId) return Promise.resolve({ ok: false, status: 404 });
  const { settings, reppingId, startedAt, lastLearnedAt } = deck;
  const repping = await db.reppings.get(reppingId);
  if (!repping) return Promise.resolve({ ok: false, status: 404 });
  const data = { deckId, repping, settings, startedAt, lastLearnedAt };
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ data }),
  });
}

async function learning_update({ deckId, ...data }: HTTPParams) {
  const deck = await db.decks.get(deckId);
  if (!deck) return Promise.resolve({ ok: false, status: 404 });
  await db.decks.update(deckId, { ...data });
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({}),
  });
}

async function learning_delete({ deckId }: HTTPParams) {
  const deck = await db.decks.get(deckId);
  if (!deck?.reppingId) return Promise.resolve({ ok: false, status: 404 });
  const updated = {
    isLearning: false,
    reppingId: null,
    settings: null,
    startedAt: null,
    lastLearnedAt: null,
  };
  await db.decks.update(deckId, updated);
  return Promise.resolve({
    ok: true,
    status: 204,
    json: () => ({}),
  });
}

async function lesson_get(params: HTTPParams) {
  const { deck: deckId } = params;

  if (deckId) {
    const deck = await db.decks.get(deckId);
    if (!isDeckLearning(deck)) return Promise.resolve({ ok: false, status: 404 });

    const data = [{
      deckId,
      title: deck?.title,
      reppingId: deck?.reppingId,
      settings: deck?.settings,
    }];

    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => ({ data }),
    });
  }

  return Promise.resolve({ ok: false, status: 404 });
}

async function lesson_deck_get(params: HTTPParams) {
  const { type, id, limit } = params;

  const deck = await db.decks.get(id);
  if (!deck || !isDeckLearning(deck)) return Promise.resolve({ ok: false, status: 404 });

  const deckLimit = deck.settings.lessonLimits[type];

  let cards;

  if (type === LESSON_INITIAL_TYPE) {
    cards = await db.cards
      .where({ deckId: deck?.id })
      .filter(({ progress }) => (!progress?.dueAt && !progress?.isCompleted))
      .limit(limit || deckLimit)
      .toArray();
  }

  if (type === LESSON_LEARNING_TYPE) {
    cards = await db.cards
      .where({ deckId: deck?.id })
      .filter(({ progress }) => (
        !!progress?.dueAt
        && new Date(progress.dueAt) < new Date()
        && !progress?.isCompleted
      ))
      .limit(limit || deckLimit)
      .toArray();
  }

  const data = { ...deck, cards };
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ data }),
  });
}

async function lesson_repping_get({ id }: HTTPParams) {
  const data = await db.reppings.get(id);
  return Promise.resolve(
    data
      ? { ok: true, status: 200, json: () => ({ data }) }
      : { ok: false, status: 404 },
  );
}

async function lesson_results_set({ data }: HTTPParams) {
  data.forEach(({ deckId, cards }: LessonDeckResult) => {
    cards.forEach(async ({ cardId, ...card }: LessonCardResult) => {
      await db.cards.update(`${deckId}/${cardId}`, { progress: card });
      await db.decks.update(deckId, { lastLearnedAt: formatDateTime(new Date()) });
    });
  });

  if (data) return Promise.resolve({ ok: true, status: 204, json: () => ({}) });
  return Promise.resolve({ ok: true, status: 409, json: () => ({}) });
}

function isDeckLearning(deck?: Deck) {
  return !!(deck?.isEligible && deck?.isLearning && deck?.reppingId);
}

export default requests;
