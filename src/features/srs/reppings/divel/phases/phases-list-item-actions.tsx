/* eslint-disable react/no-array-index-key */
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { EditbarMode } from 'features/app/ui/editbar/editbar';
import { Phase } from 'features/srs/srs-types';
import Button from 'features/app/ui/form/button';
import PhasesListItemActionsItem from './phases-list-item-actions-item';

const PREFIX = 'srs:phases.one.actions';

interface Props {
  mode: EditbarMode;
  phase: Phase;
  index: number;
  dispatch: ReducerDispatch;
}

export default function PhasesListItemActions({ mode, phase, index, dispatch }: Props) {
  const { t } = useTranslation('srs');

  const handleAddClick = useCallback(() => {
    dispatch(['actionAdded', { phaseIndex: index }]);
  }, [index]);

  return (
    <div className="phase-actions">
      <h3 className="phase-actions__title title">
        {t(`${PREFIX}.title`)}
      </h3>
      <div className="phase-actions__content">
        <ol className="phase-actions__list">
          { phase.actions.map((action, i) => (
            <PhasesListItemActionsItem
              key={i}
              mode={mode}
              phaseIndex={index}
              actionIndex={i}
              actionsTotal={phase.actions.length}
              action={action}
              dispatch={dispatch}
            />
          ))}
        </ol>
        { (mode === 'edit') && (
          <Button
            className="phase-actions__add add-button"
            onClick={handleAddClick}
            content={t(`${PREFIX}.add`)}
          />
        )}
      </div>
    </div>
  );
}
