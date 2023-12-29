import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { int } from 'features/app/misc/misc';
import { PhaseTrigger, PhasePeriod } from 'features/srs/srs-types';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { EditbarMode } from 'features/app/ui/editbar/editbar';
import NumberInput from 'features/app/ui/form/number-input';

const PREFIX = 'srs:phases';

interface Props {
  mode: EditbarMode;
  incorrectTotal: number;
  phaseIndex: number;
  trigger: PhaseTrigger;
  period: PhasePeriod;
  dispatch: ReducerDispatch;
}

export default function PhasesListItemTriggerTimeInputElement(
  { mode, incorrectTotal, phaseIndex, trigger, period, dispatch }: Props,
) {
  const { t } = useTranslation('srs');

  const handleChange = useCallback(({ target: { value } }) => {
    dispatch(['delayUpdated', { phaseIndex, incorrectTotal, period, value }]);
  }, [phaseIndex, incorrectTotal, period]);

  if (mode === 'view' && trigger.delay[period] === 0) return null;

  return (
    <div className={clsx('phase-period', period)}>
      { mode === 'view' && (
        <span className="phase-period__value">
          {trigger.delay[period]}
        </span>
      )}
      { mode === 'edit' && (
        <NumberInput
          className="phase-period__value"
          value={`${trigger.delay[period]}`}
          onChange={handleChange}
        />
      )}
      <span className="phase-period__label">
        {t(`${PREFIX}.periods.${period}`, { count: int(trigger.delay[period]) })}
      </span>
    </div>
  );
}
