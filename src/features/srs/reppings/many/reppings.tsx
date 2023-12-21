import { useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageProps } from 'features/app/app-types';
import titles from 'features/app/routing/titles';
import { useReppingsPaginatedQuery } from 'features/srs/reppings/reppings-queries';
import { Repping } from 'features/srs/srs-types';
import Feature from 'features/app/ui/feature/feature';
import Many from 'features/app/ui/feature/many/many';
import { reppingsReducer, reppingsDefault } from './reppings-reducer';
import ReppingsItem from './reppings-item';
import ReppingsOptions from './reppings-options';
import './reppings.scss';

const entity = 'reppings';
const PREFIX = 'srs:reppings.many';

export default function ManyReppings({ isDemo }: PageProps) {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reppingsReducer, reppingsDefault);
  const query = useReppingsPaginatedQuery(state.params, { isDemo });
  const { data = [] } = state.reppings;

  useEffect(() => {
    document.title = titles.reppings(t, { isDemo });
  }, [t, isDemo]);

  useEffect(() => { dispatch(['dataUpdated', query.data]); }, [query.data]);

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
              { data.map((repping: Repping) => (
                <Many.ListItem key={repping.id}>
                  <ReppingsItem repping={repping} />
                </Many.ListItem>
              ))}
            </Many.List>
            <Many.Empty length={data.length}>
              {t(`${PREFIX}.empty`)}
            </Many.Empty>
          </Many.Content>
          <ReppingsOptions
            state={state}
            dispatch={dispatch}
          />
        </Many>
      </Feature.Content>
    </Feature>
  );
}
