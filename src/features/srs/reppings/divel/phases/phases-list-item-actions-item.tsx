import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { EditbarMode } from 'features/app/ui/editbar/editbar';
import { PhaseAction } from 'features/srs/srs-types';
import { PHASE_ACTIONS_TIMES_MAX, PHASE_ACTIONS_TIMES_MIN } from 'features/srs/reppings/reppings-defaults';
import {
  PHASE_ACTION_TYPES, getPhaseActionTypeObjectById, getPhaseActionTypeValueById,
} from 'features/srs/reppings/divel/divels-domain';
import Select from 'features/app/ui/select/select';
import NumberInput from 'features/app/ui/form/number-input';
import Button from 'features/app/ui/form/button';

const PREFIX = 'srs:phases.actions';
const T_PREFIX = 'srs:phases.actions.types.';
const T_FALLBACK = 'unknown';

interface Props {
  mode: EditbarMode;
  phaseIndex: number;
  actionIndex: number;
  actionsTotal: number;
  action: PhaseAction;
  dispatch: ReducerDispatch;
}

export default function PhasesListItemActionsItem(
  { mode, phaseIndex, actionIndex, actionsTotal, action, dispatch }: Props,
) {
  const { t } = useTranslation('srs');

  const getType = useCallback((type) => (
    t(T_PREFIX + (getPhaseActionTypeValueById(type?.id) || T_FALLBACK))
  ), []);

  const setProperty = useCallback((property, value) => {
    dispatch(['actionUpdated', { phaseIndex, actionIndex, property, value }]);
  }, [phaseIndex, actionIndex]);

  const handleChange = useCallback(({ target: { name, value } }) => {
    setProperty(name, value);
  }, [setProperty]);

  const handleDeleteClick = useCallback(() => {
    dispatch(['actionDeleted', { phaseIndex, actionIndex }]);
  }, [phaseIndex, actionIndex]);

  return (
    <li className="phase-action">
      <span className="phase-action__index">
        {actionIndex + 1}
      </span>
      { (mode === 'view') && (
        <span className="phase-action__type">
          {getType(getPhaseActionTypeObjectById(action[0]))}
        </span>
      )}
      { (mode === 'edit') && (
        <Select
          className="phase-action__type"
          name="0"
          items={PHASE_ACTION_TYPES}
          selectedItem={getPhaseActionTypeObjectById(action[0])}
          getValue={getType}
          onChange={handleChange}
        />
      )}
      <span className="phase-action__times-label">
        {t(`${PREFIX}.times`)}
      </span>
      { (mode === 'view') && (
        <span className="phase-action__times-value">
          {action[1]}
        </span>
      )}
      { (mode === 'edit') && (
        <NumberInput
          className="phase-action__times"
          name="1"
          min={PHASE_ACTIONS_TIMES_MIN}
          max={PHASE_ACTIONS_TIMES_MAX}
          value={`${action[1]}`}
          onChange={handleChange}
        />
      )}
      { (mode === 'edit') && (
        <Button
          className="phase-action__delete delete-inline-button"
          onClick={handleDeleteClick}
          disabled={actionsTotal === 1}
        />
      )}
    </li>
  );
}
