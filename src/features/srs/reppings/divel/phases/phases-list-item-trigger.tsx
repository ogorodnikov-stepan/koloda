import { useTranslation } from 'react-i18next';
import { PhaseTrigger } from 'features/srs/srs-types';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { EditbarMode } from 'features/app/ui/editbar/editbar';
import { PHASE_PERIODS } from 'features/srs/reppings/reppings-defaults';
import PhasesListItemTriggerOffset from './phases-list-item-trigger-offset';
import PhasesListItemTriggerPeriod from './phases-list-item-trigger-period';

const PREFIX = 'srs:phases';

interface Props {
  mode: EditbarMode;
  incorrectTotal: number;
  phaseIndex: number;
  trigger: PhaseTrigger;
  dispatch: ReducerDispatch;
}

export default function PhasesListItemTrigger(
  { mode, incorrectTotal, phaseIndex, trigger, dispatch }: Props,
) {
  const { t } = useTranslation('srs');

  return (
    <li className="phase-trigger">
      <h3 className="phase-trigger__title title">
        {t(`${PREFIX}.triggers.titles.${incorrectTotal}`)}
      </h3>
      <PhasesListItemTriggerOffset
        mode={mode}
        incorrectTotal={incorrectTotal}
        phaseIndex={phaseIndex}
        trigger={trigger}
        dispatch={dispatch}
      />
      <div className="phase-periods">
        { trigger.isDelayEmpty && mode === 'view' ? (
          <span className="phase-periods__label">
            {t(`${PREFIX}.triggers.titles.emptyDelay`)}
          </span>
        ) : (
          <>
            <span className="phase-periods__label">
              {t(`${PREFIX}.triggers.titles.periods`)}
            </span>
            {PHASE_PERIODS.map((period) => (
              <PhasesListItemTriggerPeriod
                key={period}
                mode={mode}
                phaseIndex={phaseIndex}
                incorrectTotal={incorrectTotal}
                period={period}
                trigger={trigger}
                dispatch={dispatch}
              />
            ))}
          </>
        )}
      </div>
    </li>
  );
}
