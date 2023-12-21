import { TFunction } from 'react-i18next';

type Titles = string[];
type TitleFunction = (t: TFunction, params: Record<string, any>) => string;
type AppTitles = Record<string, TitleFunction>;

const PREFIX = 'app:titles';
const DELIMITER = `${PREFIX}.delimiter`;
const APP = `${PREFIX}.app`;
const DEMO = `${PREFIX}.demo`;
const REPPINGS = `${PREFIX}.reppings`;
const DECKS = `${PREFIX}.decks`;

const title = (titles: Titles, delimiter: string) => (titles.join(delimiter));

const titles: AppTitles = {
  account: (t, { isDemo }) => (
    isDemo
      ? title([t(`${PREFIX}.account`), t(DEMO), t(APP)], t(DELIMITER))
      : title([t(`${PREFIX}.account`), t(APP)], t(DELIMITER))
  ),
  learnings: (t, { isDemo }) => (
    isDemo
      ? title([t(DEMO), t(APP)], t(DELIMITER))
      : title([t(APP)], t(DELIMITER))
  ),
  reppings: (t, { isDemo }) => (
    isDemo
      ? title([t(REPPINGS), t(DEMO), t(APP)], t(DELIMITER))
      : title([t(REPPINGS), t(APP)], t(DELIMITER))
  ),
  repping: (t, { isDemo, repping }) => (
    isDemo
      ? title([repping, t(REPPINGS), t(DEMO), t(APP)], t(DELIMITER))
      : title([repping, t(REPPINGS), t(APP)], t(DELIMITER))
  ),
  divel: (t, { isDemo, repping, divel }) => (
    isDemo
      ? title([divel, repping, t(REPPINGS), t(DEMO), t(APP)], t(DELIMITER))
      : title([divel, repping, t(REPPINGS), t(APP)], t(DELIMITER))
  ),
  decks: (t, { isDemo }) => (
    isDemo
      ? title([t(DECKS), t(DEMO), t(APP)], t(DELIMITER))
      : title([t(DECKS), t(APP)], t(DELIMITER))
  ),
  deck: (t, { isDemo, deck }) => (
    isDemo
      ? title([deck, t(DECKS), t(DEMO), t(APP)], t(DELIMITER))
      : title([deck, t(DECKS), t(APP)], t(DELIMITER))
  ),
  lesson: (t, { isDemo }) => (
    isDemo
      ? title([t(`${PREFIX}.lesson`), t(DEMO), t(APP)], t(DELIMITER))
      : title([t(`${PREFIX}.lesson`), t(APP)], t(DELIMITER))
  ),
};

export default titles;
