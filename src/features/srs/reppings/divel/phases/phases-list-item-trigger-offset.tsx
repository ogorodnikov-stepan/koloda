import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { int } from 'features/app/misc/misc';
import { PhaseTrigger } from 'features/srs/srs-types';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { EditbarMode } from 'features/app/ui/editbar/editbar';
import {
  PHASE_OFFSET_TYPES, getPhaseOffsetTypeObjectById, getPhaseOffsetTypeValueById,
} from 'features/srs/reppings/divel/divels-domain';
import Select from 'features/app/ui/select/select';
import NumberInput from 'features/app/ui/form/number-input';

const PREFIX = 'srs:phases.offset';
const T_PREFIX = 'srs:phases.offset.types.';
const T_FALLBACK = 'unknown';

interface Props {
  mode: EditbarMode;
  incorrectTotal: number;
  phaseIndex: number;
  trigger: PhaseTrigger;
  dispatch: ReducerDispatch;
}

export default function PhasesListItemTriggerOffset(
  { mode, incorrectTotal, phaseIndex, trigger, dispatch }: Props,
) {
  const { t } = useTranslation('srs');

  const getType = useCallback((type) => (
    t(T_PREFIX + (getPhaseOffsetTypeValueById(type?.id) || T_FALLBACK))
  ), []);

  const setProperty = useCallback((property, value) => {
    dispatch(['offsetUpdated', { phaseIndex, incorrectTotal, property, value }]);
  }, [phaseIndex, incorrectTotal]);

  const handleChange = useCallback(({ target: { name, value } }) => {
    setProperty(name, value);
  }, [setProperty]);

  return (
    <div className="phase-offset">
      { mode === 'view' && (
        <span className="phase-offset__type">
          {getType(getPhaseOffsetTypeObjectById(trigger.offset[0]))}
        </span>
      )}
      { mode === 'edit' && (
        <Select
          className="phase-offset__type"
          name="0"
          items={PHASE_OFFSET_TYPES}
          selectedItem={getPhaseOffsetTypeObjectById(trigger.offset[0])}
          getValue={getType}
          onChange={handleChange}
        />
      )}
      { [1, 2, 3].includes(trigger.offset[0]) && (
        <>
          { mode === 'view' && (
            <span className="phase-offset__value">
              {trigger.offset[1]}
            </span>
          )}
          { mode === 'edit' && (
            <NumberInput
              className="phase-offset__value"
              name="value"
              value={`${trigger.offset[1]}`}
              onChange={handleChange}
            />
          )}
          { [1, 2].includes(trigger.offset[0]) && (
            <span className="phase-offset__value-label">
              {t(`${PREFIX}.phases`, { count: int(trigger.offset[1]) })}
            </span>
          )}
        </>
      )}
    </div>
  );
}
