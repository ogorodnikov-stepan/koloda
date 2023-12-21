// import { useEffect } from 'react';
import { ComponentsList } from 'features/app/app-types';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/lessons/lesson/lesson-reducer';
import LessonActionDivels from './lesson-action-divels';
import LessonActionShow from './action-types/lesson-action-show';
import LessonActionTypeTest from './action-types/lesson-action-typetest';

const ACTION_TYPE_COMPONENTS: ComponentsList = {
  show: LessonActionShow,
  typeTest: LessonActionTypeTest,
  typeTestReverse: LessonActionTypeTest,
};

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function LessonAction({ state, dispatch }: Props) {
  const { type = 'unknown', isInitial } = state.current.action || {};
  const LessonActionType = type && ACTION_TYPE_COMPONENTS[type];

  if (!LessonActionType) return null;

  return (
    <div
      className="lesson__action"
      data-action-type="show"
    >
      <LessonActionType
        state={state}
        dispatch={dispatch}
      />
      { isInitial && (
        <LessonActionDivels
          state={state}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}
