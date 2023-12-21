import { useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageProps } from 'features/app/app-types';
import titles from 'features/app/routing/titles';
import { useLearningsPaginatedQuery } from 'features/srs/learnings/learnings-queries';
import Feature from 'features/app/ui/feature/feature';
import Many from 'features/app/ui/feature/many/many';
import { learningsReducer, learningsDefault } from './learnings-reducer';
import LearningsTable from './learnings-table';
import LearningsOptions from './learnings-options';
import './learnings.scss';

const entity = 'learnings';

export default function ManyLearnings({ isDemo }: PageProps) {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(learningsReducer, learningsDefault);
  const query = useLearningsPaginatedQuery(state.params, { isDemo });

  useEffect(() => {
    document.title = titles.learnings(t, { isDemo });
  }, [t, isDemo]);

  useEffect(() => { dispatch(['isDemoSet', isDemo]); }, [isDemo]);
  useEffect(() => { dispatch(['dataUpdated', query.data]); }, [query.data]);

  return (
    <Feature entity={entity}>
      <Feature.Content>
        <Many entity={entity}>
          <Many.Content query={query}>
            <LearningsTable
              state={state}
            />
          </Many.Content>
          <LearningsOptions
            state={state}
            dispatch={dispatch}
          />
        </Many>
      </Feature.Content>
    </Feature>
  );
}
