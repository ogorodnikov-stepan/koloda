import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/reppings/divel/divel-reducer';
import Button from 'features/app/ui/form/button';
import DivelPhasesItem from './divel-phases-item';

const PREFIX = 'srs:phases.many';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DivelPhases({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { data, status: { editbar: { mode } } } = state.phases;

  const handleAddClick = useCallback(() => {
    dispatch(['phaseAdded', {}]);
  }, []);

  return (
    <>
      <ul className="phases">
        { data && data.map((phase, index) => (
          <DivelPhasesItem
            key={phase.id}
            mode={mode}
            phase={phase}
            index={index}
            dispatch={dispatch}
          />
        ))}
      </ul>
      { (mode === 'edit') && (
        <Button
          className="phases__add add-button"
          onClick={handleAddClick}
          content={t(`${PREFIX}.add`)}
        />
      )}
    </>
  );
}
