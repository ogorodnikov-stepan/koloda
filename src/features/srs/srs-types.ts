import { PHASE_PERIODS } from 'features/srs/reppings/reppings-defaults';

// 1 - null option for filters ("Any" option)

export interface Subject {
  id: number | null; // 1
  value: string;
}

export interface Category {
  id: number | null; // 1
  value: string;
  subjects?: Subject[];
}

export interface Language {
  id: number;
  value: string;
}

export interface Deck extends Record<string, any> {
  id: string;
}

export interface Field extends Record<string, any> {
  id: number;
  title: string;
  type: FieldType;
  role: FieldRole;
  settings: FieldSettings;
}

export enum FieldType {
  Text = 1,
}

export enum FieldRole {
  Other = 1,
  Front = 2,
  Back = 3,
}

export interface FieldSettings {
  actions?: {
    show?: {
      isLabelVisible?: boolean;
    }
    typeTest?: {
      isLabelVisible?: boolean;
      processings: string[];
    }
  }
}

export interface Card {
  id: number;
  content: Record<string, CardFieldContent>;
  meta?: {
    status: 'initial' | 'learning' | 'completed';
    divel?: {
      index: number;
      title: Divel['title'];
    }
  };
  progress?: CardProgress;
}

interface CardProgress {
  isCompleted?: boolean;
  divel?: Divel['id'];
  phase?: Phase['id'];
  dueAt?: string;
}

export interface CardFieldContent {
  text: string;
}

export interface Repping extends Record<string, any> {
  id: string;
  divels: Divel[];
}

export interface Divel extends Record<string, any> {
  id: number;
  title: string;
  phases?: Phase[];
  isDefault?: boolean;
}

export interface Phase extends Record<string, any> {
  id: number;
  title?: string;
  actions: PhaseAction[];
  triggers: Record<number, PhaseTrigger>;
}

export interface PhaseAction {
  type: number;
  times: number;
}

export interface PhaseTrigger {
  offset: {
    type: number;
    value: Phase['id'] | number;
  };
  delay: {
    [key in PhasePeriod]: number;
  }
  isDelayEmpty?: boolean;
}

export type PhasePeriod = typeof PHASE_PERIODS[number];

export interface Learning extends Record<string, any> {
  deckId?: string | null;
  repping?: Repping;
  createdAt?: string;
  settings: LearningSettings;
}

export interface LearningSettings {
  lessonLimits: { [x in LessonType]: number; }
}

export type LessonType = 'new' | 'rep';

export type LessonPlan = LessonPlanItem[];

interface LessonPlanItem {
  deckId: Deck['id'];
  reppingId: Repping['id'];
  title: Deck['title'];
}

export interface LessonIndex {
  deck: number;
  card: number;
}

export interface LessonDeck extends Deck {
  cards: LessonCard[];
  lesson: LessonDeckMeta;
}

export interface LessonDeckMeta {
  isProcessed?: boolean;
  isDone: boolean;
  isError: boolean;
  cardsTotal: number;
  cardsDone: number;
  currentCard: number;
}

export interface LessonCard extends Card {
  lesson: LessonCardMeta;
}

export interface LessonCardMeta {
  divel?: CardProgress['divel'];
  phase?: CardProgress['phase'];
  actions: PhaseAction[];
  results?: {
    correct: number;
    incorrect: number;
  }[];
  currentActionIndex: number;
  isInitial: boolean;
  isDone: boolean;
  isError?: boolean;
}

export interface LessonCardResult {
  cardId: Card['id'];
  dueAt: CardProgress['dueAt'];
  divel?: CardProgress['divel'];
  phase?: CardProgress['phase'];
  isCompleted?: CardProgress['isCompleted'];
}

export interface LessonActionResult {
  result?: boolean;
  isError?: boolean;
}

export interface LessonDeckResult {
  deckId: Deck['id'];
  cards: LessonCardResult[];
}

export type LessonResults = LessonDeckResult[];

export interface LessonField {
  id: Field['id'];
  type: Field['type'];
  role: Field['role'];
  settings: FieldSettings;
  content: CardFieldContent;
  value?: string;
  isTested?: boolean;
  isCorrect?: boolean;
  isFocused?: boolean;
}
