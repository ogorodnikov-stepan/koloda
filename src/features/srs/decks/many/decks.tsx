import { useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageProps } from 'features/app/app-types';
import titles from 'features/app/routing/titles';
import { useDecksPaginatedQuery } from 'features/srs/decks/decks-queries';
import { Deck } from 'features/srs/srs-types';
import Feature from 'features/app/ui/feature/feature';
import Many from 'features/app/ui/feature/many/many';
import { decksReducer, decksDefault } from './decks-reducer';
import DecksItem from './decks-item';
import DecksOptions from './decks-options';
import './decks.scss';

const entity = 'decks';
const PREFIX = 'srs:decks.many';

export default function ManyDecks({ isDemo }: PageProps) {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(decksReducer, decksDefault);
  const query = useDecksPaginatedQuery(state.params, { isDemo });
  const { data = [] } = state.decks;

  useEffect(() => {
    document.title = titles.decks(t, { isDemo });
  }, [t, isDemo]);

  useEffect(() => {
    dispatch(['dataUpdated', query.data]);
  }, [query.data]);

  return (
    <Feature entity={entity}>
      <Feature.Header>
        <Feature.Title>
          {t(`${PREFIX}.title`)}
        </Feature.Title>
      </Feature.Header>
      <Feature.Content>
        <Many entity={entity}>
          <Many.Content query={query}>
            <Many.List length={data.length}>
              { data.map((deck: Deck) => (
                <Many.ListItem key={deck.id}>
                  <DecksItem deck={deck} />
                </Many.ListItem>
              ))}
            </Many.List>
            <Many.Empty length={data.length}>
              {t(`${PREFIX}.empty`)}
            </Many.Empty>
          </Many.Content>
          <DecksOptions
            state={state}
            dispatch={dispatch}
          />
        </Many>
      </Feature.Content>
    </Feature>
  );
}
