/* eslint-disable no-param-reassign */
import produce from 'immer';
import cloneDeep from 'lodash.clonedeep';
import set from 'lodash.set';
import { TFunction } from 'react-i18next';
import {
  ReducerEntity, ReducerReadOnlyEntity, ReducerState, ReducerActions,
} from 'features/app/reducer/reducer-types';
import {
  isDemoSet, editbarModeSet, displayOptionSet, onChangesDiscarded,
  entityUpdated, validationCompleted, validationFailed, savingInitiated,
  savingFailed, onSavingCompleted,
} from 'features/app/reducer/reducer-helpers';
import { Repping, Deck, Field, Card, Learning } from 'features/srs/srs-types';
import { getNextNumericId, int } from 'features/app/misc/misc';
import {
  FIELD_DEFAULT, DECK_FIELDS_MAX, CARD_DEFAULT, DECK_CARDS_MAX,
} from 'features/srs/decks/decks-defaults';
import { getLearningMeta, updateCardLearningMeta, updateCardsLearningMeta } from 'features/srs/learnings/learnings-domain';

interface Fields {
  deckId?: Deck['id'];
  fields?: Field[];
}

interface Cards {
  deckId?: Deck['id'];
  cards?: Card[];
}

export interface State extends ReducerState {
  deck: ReducerEntity<Deck>;
  learning: ReducerEntity<Learning>;
  fields: ReducerEntity<Fields>;
  cards: ReducerEntity<Cards, Card>;
  reppings: ReducerReadOnlyEntity<Repping[]>;
}

type Entity = 'deck' | 'learning' | 'fields' | 'cards';

export const deckDefault: State = {
  meta: {
    tabs: {
      headers: ['progress', 'about', 'fields', 'cards'],
      items: {
        progress: { disabled: true },
        about: { disabled: true },
        fields: { disabled: true },
        cards: { disabled: true },
      },
    },
  },
  deck: {
    status: {
      editbar: { variant: 'click', mode: 'view' },
      message: 'initial',
      isSaved: true,
      discard: { isEnabled: true, isReady: true },
      canEdit: true,
    },
  },
  learning: {
    status: {
      editbar: { variant: 'click', mode: 'view' },
      message: 'initial',
      isSaved: true,
      discard: { isEnabled: true, isReady: true },
      canEdit: true,
    },
  },
  fields: {
    status: {
      editbar: { variant: 'click', mode: 'view' },
      message: 'initial',
      isSaved: true,
      discard: { isEnabled: true, isReady: true },
      canEdit: true,
    },
  },
  cards: {
    status: {
      editbar: { variant: 'click', mode: 'view' },
      message: 'initial',
      isSaved: true,
      discard: { isEnabled: true, isReady: true },
      canEdit: true,
      display: {
        mode: 'table',
        showProgress: true,
        currentItem: {},
      },
    },
  },
  reppings: {},
};

const actions: ReducerActions = {
  isDemoSet,
  editbarModeSet,
  displayOptionSet,
  deckReceived,
  learningReceived,
  cardsReceived,
  reppingsReceived,
  deckUpdated,
  learningAdded,
  learningUpdated,
  learningDeleted,
  fieldAdded,
  fieldUpdated,
  fieldSettingUpdated,
  fieldDeleted,
  fieldMoved,
  cardAdded,
  cardUpdated,
  cardProgressUpdated,
  cardDeleted,
  cardMoved,
  currentCardSet,
  changesDiscarded,
  validationCompleted,
  validationFailed,
  savingInitiated,
  savingFailed,
  savingCompleted,
};

function updateTabsStatus(draft: State) {
  if (!draft.meta.tabs) return;
  const { progress, about, fields, cards } = draft.meta.tabs.items;
  progress.disabled = false;
  about.disabled = false;
  fields.disabled = draft.deck.status.editbar.mode === 'edit' || draft.cards.status.editbar.mode === 'edit';
  cards.disabled = draft.deck.status.editbar.mode === 'edit' || draft.fields.status.editbar.mode === 'edit';
}

interface DeckReceivedPayload { data: Deck }

function deckReceived(draft: State, { data }: DeckReceivedPayload) {
  const { fields, ...deck } = cloneDeep(data);
  draft.meta.title = deck.title;
  draft.deck.data = deck;
  draft.deck.status.isLoaded = true;
  draft.fields.status.isLoaded = true;
  draft.fields.data = { deckId: deck.id, fields };
  if (draft.cards.data) {
    draft.cards.data.deckId = deck.id;
  } else {
    draft.cards.data = { deckId: deck.id };
  }
  setCanAddField(draft);
  updateTabsStatus(draft);
}

interface LearningReceivedPayload { data?: Learning }

function learningReceived(draft: State, { data }: LearningReceivedPayload) {
  draft.learning.data = cloneDeep(data);
  draft.learning.status.isLoaded = true;
  updateLearningCards(draft);
}

interface CardsReceivedPayload { data: Card[]; }

function cardsReceived(draft: State, { data }: CardsReceivedPayload) {
  if (draft.cards.data) draft.cards.data.cards = cloneDeep(data);
  draft.cards.status.isLoaded = true;
  setCanAddCard(draft);
  updateTabsStatus(draft);
  updateLearningCards(draft);
  if (data[0]) currentCardSet(draft, { id: data[0].id });
}

interface ReppingsReceivedPayload { data: Repping[] }

function reppingsReceived(draft: State, { data }: ReppingsReceivedPayload) {
  draft.reppings.data = cloneDeep(data);
  draft.reppings.isLoaded = true;
  updateLearningCards(draft);
}

function setCanAddField(draft: State) {
  const { fields } = draft.fields?.data || {};
  if (fields) draft.fields.status.canAdd = fields.length < DECK_FIELDS_MAX;
}

function setCanAddCard(draft: State) {
  const { cards } = draft.cards?.data || {};
  if (cards) draft.cards.status.canAdd = cards.length < DECK_CARDS_MAX;
}

interface DeckUpdatedPayload {
  property: keyof Deck;
  value: any;
}

function deckUpdated(draft: State, payload: DeckUpdatedPayload) {
  const { property, value } = payload;
  const { data, status } = draft.deck;
  if (data && data[property] !== value) {
    entityUpdated(status);
    data[property] = value;
  }
}

function learningAdded(draft: State, payload: { data: Learning }) {
  draft.learning.data = payload.data;
  updateLearningCards(draft);
}

interface LearningUpdatedPayload {
  path: string;
  value: any;
}

function learningUpdated(draft: State, { path, value }: LearningUpdatedPayload) {
  const { data, status } = draft.learning;
  if (!data) return;
  set(data, path, value);
  entityUpdated(status);
}

function learningDeleted(draft: State) {
  draft.learning.data = undefined;
}

interface FieldAddedPayload {
  t: TFunction;
}

function fieldAdded(draft: State, { t }: FieldAddedPayload) {
  const { data, status } = draft.fields;
  const { fields } = data || {};
  const id = getNextNumericId(fields || []);
  if (fields) {
    const title = t('srs:decks.one.fields.many.table.properties.title.default');
    fields.push({ ...FIELD_DEFAULT, id, title });
    entityUpdated(status);
    setCanAddField(draft);
    updateTabsStatus(draft);
  }
}

interface FieldUpdatedPayload {
  index: number;
  property: keyof Field;
  value: Field[keyof Field];
}

function fieldUpdated(draft: State, payload: FieldUpdatedPayload) {
  const { index, property, value } = payload;
  const { data, status } = draft.fields;
  const { fields } = data || {};
  if (fields) {
    fields[index][property] = value;
    entityUpdated(status);
    updateTabsStatus(draft);
  }
}

interface FieldSettingUpdatedPayload {
  index: number;
  path: string;
  value: boolean;
}

function fieldSettingUpdated(draft: State, payload: FieldSettingUpdatedPayload) {
  const { index, path, value } = payload;
  const { data, status } = draft.fields;
  const { fields } = data || {};
  if (fields) {
    set(fields[index], path, value);
    entityUpdated(status);
    updateTabsStatus(draft);
  }
}

interface FieldDeletedPayload {
  index: number;
}

function fieldDeleted(draft: State, payload: FieldDeletedPayload) {
  const { data, status } = draft.fields;
  const { fields } = data || {};
  if (fields) {
    const { index } = payload;
    fields.splice(index, 1);
    entityUpdated(status);
    setCanAddField(draft);
    updateTabsStatus(draft);
  }
}

interface FieldMovedPayload {
  destination: number;
  source: number;
}

function fieldMoved(draft: State, payload: FieldMovedPayload) {
  const { destination, source } = payload;
  const { data, status } = draft.fields;
  const { fields } = data || {};
  if (fields) {
    fields.splice(destination, 0, fields.splice(source, 1)[0]);
    entityUpdated(status);
    updateTabsStatus(draft);
  }
}

function cardAdded(draft: State) {
  const { data, status } = draft.cards;
  const { cards } = data || {};
  const id = getNextNumericId(cards || []);
  if (cards) {
    cards.push(cloneDeep({ ...CARD_DEFAULT, id }));
    entityUpdated(status);
    setCanAddCard(draft);
    updateTabsStatus(draft);
    currentCardSet(draft, { id });
  }
}

interface CardUpdatedPayload {
  index: number;
  property: Field['id'];
  value: any;
}

function cardUpdated(draft: State, { index, property, value }: CardUpdatedPayload) {
  const { data, status } = draft.cards;
  const { cards } = data || {};
  if (cards && property) {
    if (!cards[index].content[property]) cards[index].content[property] = { text: '' };
    cards[index].content[property].text = value;
    entityUpdated(status);
    updateTabsStatus(draft);
  }
}

interface CardProgressUpdatedPayload {
  id: string;
  property: string;
}

function cardProgressUpdated(draft: State, { id, property }: CardProgressUpdatedPayload) {
  const { repping } = draft.learning.data || {};
  const { data, status } = draft.cards;
  const { cards } = data || {};
  if (cards && repping && ['progress', 'isCompleted'].includes(property)) {
    const index = cards.findIndex((x) => (x.id === int(id)));
    if (property === 'progress') cards[index].progress = {};
    if (property === 'isCompleted') cards[index].progress = { isCompleted: true };
    updateCardLearningMeta(cards[index], repping);
    entityUpdated(status);
    updateTabsStatus(draft);
  }
}

interface CardDeletedPayload {
  index: number;
}

function cardDeleted(draft: State, payload: CardDeletedPayload) {
  const { data, status } = draft.cards;
  const { cards } = data || {};
  if (cards) {
    const { index } = payload;
    cards.splice(index, 1);
    entityUpdated(status);
    setCanAddCard(draft);
    updateTabsStatus(draft);
    if (status.display?.currentItem) status.display.currentItem = {};
  }
}

interface CardMovedPayload {
  destination: number;
  source: number;
}

function cardMoved(draft: State, payload: CardMovedPayload) {
  const { destination, source } = payload;
  const { data, status } = draft.cards;
  const { cards } = data || {};
  if (cards) {
    cards.splice(destination, 0, cards.splice(source, 1)[0]);
    entityUpdated(status);
    updateTabsStatus(draft);
  }
}

interface CurrentCardSetPayload {
  id: Card['id'];
}

function currentCardSet(draft: State, payload: CurrentCardSetPayload) {
  if (draft.cards.status.display && draft.cards.data?.cards) {
    const id = int(payload.id);
    const index = draft.cards.data.cards.findIndex((x) => (x.id === id));
    draft.cards.status.display.currentItem = { id, index };
  }
}

interface ChangesDiscardedPayload {
  entity: Entity;
}

function changesDiscarded(draft: State, { entity }: ChangesDiscardedPayload) {
  onChangesDiscarded(draft, { entity });
  if (entity === 'fields') setCanAddField(draft);
  if (entity === 'cards') setCanAddCard(draft);
  updateTabsStatus(draft);
}

interface SavingCompletedPayload {
  entity: Entity;
  data: Learning;
}

function savingCompleted(draft: State, { entity, data }: SavingCompletedPayload) {
  onSavingCompleted(draft[entity]);
  if (draft.deck.data) {
    draft.deck.data.isEligible = data.isEligible;
    draft.deck.data.requirements = data.requirements;
    draft.deck.data.updatedAt = data.updatedAt;
    if (entity === 'deck') draft.meta.title = draft.deck.data.title;
    if (entity === 'fields') draft.deck.data.fieldsTotal = data.fieldsTotal;
    if (entity === 'cards') {
      draft.deck.data.cardsTotal = data.cardsTotal;
      updateLearningCards(draft);
    }
  }
  updateTabsStatus(draft);
}

function updateLearningCards(draft: State) {
  const { cards } = draft.cards.data || {};
  const { repping } = draft.learning.data || {};
  if (repping && cards) {
    updateCardsLearningMeta(cards, repping);
    draft.learning.meta = getLearningMeta(cards, repping);
  }
}

export const deckReducer = produce((draft, [type, payload]) => {
  if (actions[type]) actions[type](draft, payload);
  return draft;
});
