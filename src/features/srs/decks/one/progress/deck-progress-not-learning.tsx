import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore, isDemoSelector } from 'features/app/app-store';
import { useAddLearningMutation } from 'features/srs/learnings/learnings-queries';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import Button from 'features/app/ui/form/button';
import ReppingSelect from 'features/srs/decks/selects/repping-select';

const PREFIX = 'srs:decks.one.progress.notLearning';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckProgressNotLearning({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const isDemo = useStore(isDemoSelector);
  const add = useAddLearningMutation({ isDemo });
  const reppings = state.reppings.data!;
  const [data, setData] = useState({ deckId: state.deck?.data?.id, reppingId: reppings[0].id });

  const handleChange = useCallback(({ target: { name, value } }) => {
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleClick = useCallback(() => {
    add.mutate(data);
  }, [data]);

  useEffect(() => {
    if (add.isSuccess) dispatch(['learningAdded', { data: add.data }]);
  }, [add.isSuccess, add.data]);

  return (
    <div className="deck-progress__not-learning">
      <h3 className="deck-progress__not-learning-title">
        {t(`${PREFIX}.title`)}
      </h3>
      <div className="deck-progress__start">
        <ReppingSelect
          className="deck-progress__start-repping"
          label={t('decks.selects.repping.label')}
          reppings={reppings}
          value={data.reppingId}
          onChange={handleChange}
        />
        <Button
          className="deck-progress__start-button"
          name="isLearning"
          value="true"
          onClick={handleClick}
          content={t(`${PREFIX}.start.button`)}
        />
      </div>
    </div>
  );
}
