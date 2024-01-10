import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { Phase } from 'features/srs/srs-types';
import { EditbarMode } from 'features/app/ui/editbar/editbar';
import { PHASE_TRIGGERS } from 'features/srs/reppings/reppings-defaults';
import DivelPhasesItemHeader from './divel-phases-item-header';
import DivelPhasesItemTrigger from './divel-phases-item-trigger';
import DivelPhasesItemActions from './divel-phases-item-actions';

interface Props {
  mode: EditbarMode;
  phase: Phase;
  index: number;
  dispatch: ReducerDispatch;
}

export default function DivelDivelPhasesItem({ mode, phase, index, dispatch }: Props) {
  return (
    <li className="phase">
      <DivelPhasesItemHeader
        mode={mode}
        phaseIndex={index}
        phase={phase}
        dispatch={dispatch}
      />
      <div className="phase__content">
        <ul className="phase-triggers">
          { PHASE_TRIGGERS.map((total) => (
            <DivelPhasesItemTrigger
              key={total}
              mode={mode}
              incorrectTotal={total}
              phaseIndex={index}
              trigger={phase.triggers[total]}
              dispatch={dispatch}
            />
          ))}
        </ul>
        <DivelPhasesItemActions
          mode={mode}
          index={index}
          phase={phase}
          dispatch={dispatch}
        />
      </div>
    </li>
  );
}
