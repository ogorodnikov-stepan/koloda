import { useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageProps } from 'features/app/app-types';
import titles from 'features/app/routing/titles';
import { useDeckQuery, useCardsQuery } from 'features/srs/decks/decks-queries';
import { useLearningQuery } from 'features/srs/learnings/learnings-queries';
import { useReppingsQuery } from 'features/srs/reppings/reppings-queries';
import { Deck } from 'features/srs/srs-types';
import Error404 from 'features/app/pages/error/error-404';
import { Tabs, TabsHeader, TabHeader, TabContent } from 'features/app/ui/tabs/tabs';
import Feature from 'features/app/ui/feature/feature';
import { deckReducer, deckDefault } from './deck-reducer';
import DeckExport from './deck-export';
import DeckProgress from './progress/deck-progress';
import DeckAbout from './about/deck-about';
import DeckFields from './fields/deck-fields';
import DeckCards from './cards/deck-cards';

const PREFIX = 'srs:decks.one.tabs';
const REPPINGS_PARAMS = { sort: '+title', filters: { isEligible: [true] } };

interface Props extends PageProps {
  id: Deck['id'];
}

export default function OneDeck({ id, isDemo }: Props) {
  const { t } = useTranslation();
  const { isLoading, data, error } = useDeckQuery({ id }, { isDemo });
  const learningQuery = useLearningQuery({ deckId: id }, { isDemo });
  const cardsQuery = useCardsQuery({ deckId: id }, { isDemo });
  const reppingsQuery = useReppingsQuery(REPPINGS_PARAMS, { isDemo });
  const [state, dispatch] = useReducer(deckReducer, deckDefault);
  const { title } = state.meta;

  useEffect(() => {
    document.title = titles.deck(t, { isDemo, deck: title });
  }, [t, isDemo, title]);

  useEffect(() => { dispatch(['isDemoSet', isDemo]); }, [isDemo]);

  useEffect(() => { if (data) dispatch(['deckReceived', data]); }, [data]);

  useEffect(() => {
    if (learningQuery.data) dispatch(['learningReceived', learningQuery.data]);
  }, [learningQuery.data]);

  useEffect(() => {
    if (cardsQuery.data) dispatch(['cardsReceived', cardsQuery.data]);
  }, [cardsQuery.data]);

  useEffect(() => {
    if (reppingsQuery.data) dispatch(['reppingsReceived', reppingsQuery.data]);
  }, [reppingsQuery.data]);

  if ((error?.name === 'ValidationError') || (error?.status === 404)) {
    return <Error404 />;
  }

  return (
    <Feature entity="deck">
      <Tabs className="feature__tabs" defaultIndex={0}>
        <Feature.Header>
          <Feature.Title isLoading={isLoading}>
            {title}
          </Feature.Title>
          { process.env.NODE_ENV === 'development' && isDemo && (
            <DeckExport id={id} />
          )}
          <TabsHeader className="feature__tabs-header">
            { state.meta.tabs.headers.map((tab: string) => (
              <TabHeader
                key={tab}
                disabled={state.meta.tabs.items[tab].disabled}
              >
                {t(`${PREFIX}.${tab}`)}
              </TabHeader>
            ))}
          </TabsHeader>
        </Feature.Header>
        <Feature.Content>
          <TabContent className="feature__tab-content">
            <DeckProgress
              state={state}
              dispatch={dispatch}
            />
          </TabContent>
          <TabContent className="feature__tab-content">
            <DeckAbout
              state={state}
              dispatch={dispatch}
            />
          </TabContent>
          <TabContent className="feature__tab-content">
            <DeckFields
              state={state}
              dispatch={dispatch}
            />
          </TabContent>
          <TabContent className="feature__tab-content">
            <DeckCards
              state={state}
              dispatch={dispatch}
            />
          </TabContent>
        </Feature.Content>
      </Tabs>
    </Feature>
  );
}
