import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { Phase } from 'features/srs/srs-types';
import { EditbarMode } from 'features/app/ui/editbar/editbar';
import PhasesListItemHeader from './phases-list-item-header';
import PhasesListItemTrigger from './phases-list-item-trigger';
import PhasesListItemActions from './phases-list-item-actions';

interface Props {
  mode: EditbarMode;
  phase: Phase;
  index: number;
  dispatch: ReducerDispatch;
}

export default function PhasesListItem({ mode, phase, index, dispatch }: Props) {
  return (
    <li className="phase">
      <PhasesListItemHeader
        mode={mode}
        phaseIndex={index}
        phase={phase}
        dispatch={dispatch}
      />
      <div className="phase__content">
        <ul className="phase-triggers">
          <PhasesListItemTrigger
            mode={mode}
            incorrectTotal={0}
            phaseIndex={index}
            trigger={phase.triggers[0]}
            dispatch={dispatch}
          />
          <PhasesListItemTrigger
            mode={mode}
            incorrectTotal={1}
            phaseIndex={index}
            trigger={phase.triggers[1]}
            dispatch={dispatch}
          />
        </ul>
        <PhasesListItemActions
          mode={mode}
          index={index}
          phase={phase}
          dispatch={dispatch}
        />
      </div>
    </li>
  );
}
