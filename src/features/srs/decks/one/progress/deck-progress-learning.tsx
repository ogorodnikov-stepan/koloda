import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore, isDemoSelector } from 'features/app/app-store';
import { useDeleteLearningMutation } from 'features/srs/learnings/learnings-queries';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import DeleteDialog from 'features/app/ui/modal/delete-dialog/delete-dialog';
import DeckProgressLearningSettings from './deck-progress-learning-settings';
import DeckProgressLearningStats from './deck-progress-learning-stats';

const PREFIX = 'srs:decks.one.progress.learning';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckProgressLearning({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const isDemo = useStore(isDemoSelector);
  const del = useDeleteLearningMutation({ isDemo });
  const { data, status: { editbar: { mode } } } = state.learning;
  const { deckId, startedAt, lastLearnedAt } = data!;

  useEffect(() => {
    if (del.isSuccess) dispatch(['learningDeleted', {}]);
  }, [del.isSuccess]);

  return (
    <div className="deck-progress__learning">
      { (startedAt || lastLearnedAt) && (
        <div className="deck-progress__timestamps timestamps">
          { startedAt && (
            <span className="deck-progress__created-at">
              {t(`${PREFIX}.startedAt`, {
                value: new Date(startedAt),
                formatParams: { value: { dateStyle: 'long' } },
              })}
            </span>
          )}
          { lastLearnedAt && (lastLearnedAt !== startedAt) && (
            <span className="deck-progress__created-at">
              {t(`${PREFIX}.lastLearnedAt`, {
                value: new Date(startedAt),
                formatParams: { value: { dateStyle: 'long' } },
              })}
            </span>
          )}
        </div>
      )}
      <DeckProgressLearningSettings
        state={state}
        dispatch={dispatch}
      />
      { mode === 'edit' && (
        <div className="deck-progress__actions">
          <DeleteDialog
            params={{ deckId }}
            mutation={del}
            prefix={`${PREFIX}.stop`}
          />
        </div>
      )}
      <DeckProgressLearningStats
        state={state}
      />
    </div>
  );
}
