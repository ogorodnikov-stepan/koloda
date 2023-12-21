/* eslint-disable @typescript-eslint/lines-between-class-members */
import Dexie, { Table } from 'dexie';
import { User } from 'features/auth/auth-types';
import { Repping, Deck, Card } from 'features/srs/srs-types';

const DB_NAME = 'appDB';
const DB_VERSION = 3;

export class AppDatabase extends Dexie {
  users!: Table<User>;
  reppings!: Table<Repping>;
  decks!: Table<Deck>;
  cards!: Table<Card>;

  constructor() {
    super(DB_NAME);
    this.version(DB_VERSION).stores({
      users: 'uid',
      reppings: 'id, title, createdAt, updatedAt',
      decks: 'id, title, createdAt, updatedAt, lastLearnedAt, categoryId, subjectId, languageId',
      cards: 'pk, id, deckId',
    });
  }
}

export const db = new AppDatabase();
