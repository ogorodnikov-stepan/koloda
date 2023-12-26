import { qs } from '../api/request';

export type RoutingURLParams = Record<string, any>;
export type RoutingURL = (params: RoutingURLParams) => string;
export type RoutingURLs = Record<string, RoutingURL>;

const BASE = process.env.FRONT_URL || '';
const DEMO_PREFIX = `${BASE}/try`;

const url = ({ isDemo }: RoutingURLParams, value: string) => (
  isDemo ? (DEMO_PREFIX + value) : (BASE + value)
);

const urls: RoutingURLs = {
  home: (p) => url(p, '/'),
  account: (p) => url(p, '/account'),
  dashboard: (p) => url(p, '/dashboard'),
  demo: () => DEMO_PREFIX,
  reppings: (p) => url(p, '/reppings'),
  newRepping: () => '/reppings/new',
  repping: (p) => url(p, `/reppings/${p?.id}`),
  divel: (p) => url(p, `/reppings/${p?.reppingId}/divels/${p?.id}`),
  decks: (p) => url(p, '/decks'),
  newDeck: () => '/decks/new',
  deck: (p) => url(p, `/decks/${p?.id}`),
  lesson: (p) => url(p, `/learn/${p.type}${qs(p, ['deck'])}`),
};

export default urls;
