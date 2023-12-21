import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/lessons/lesson/lesson-reducer';
import Feature from 'features/app/ui/feature/feature';
import LessonStatusLoading from './status/lesson-status-loading';
import LessonStatusPending from './status/lesson-status-pending';
import LessonStatusPaused from './status/lesson-status-paused';
import LessonStatusEmpty from './status/lesson-status-empty';
import LessonStatusDone from './status/lesson-status-done';
import LessonAction from './lesson-action';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function LessonContent({ state, dispatch }: Props) {
  const { meta: { isLoaded, isPending, isPaused, isStarted, isDone } } = state;

  return (
    <Feature>
      <Feature.Content>
        { !isLoaded && (
          <LessonStatusLoading />
        )}
        { isLoaded && isPending && (
          <LessonStatusPending state={state} />
        )}
        { isLoaded && !isPending && isPaused && (
          <LessonStatusPaused />
        )}
        { isDone && isStarted && (
          <LessonStatusDone
            state={state}
            // dispatch={dispatch}
          />
        )}
        { isDone && !isStarted && (
          <LessonStatusEmpty />
        )}
        { isLoaded && !isPending && !isPaused && !isDone && (
          <LessonAction
            state={state}
            dispatch={dispatch}
          />
        )}
      </Feature.Content>
    </Feature>
  );
}
