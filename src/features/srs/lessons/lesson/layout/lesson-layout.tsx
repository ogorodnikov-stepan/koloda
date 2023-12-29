import { useStore, isDemoSelector } from 'features/app/app-store';
import urls from 'features/app/routing/urls';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/lessons/lesson/lesson-reducer';
import Header from 'features/app/layout/header/header';
import Main from 'features/app/layout/main/main';
import LessonContent from 'features/srs/lessons/lesson/lesson-content';
import LessonProgress from './lesson-progress';
import LessonQueue from './lesson-queue';
import LessonTerminateDialog from './lesson-terminate';
import './lesson-layout.scss';

const PREFIX = 'srs:lessons.ui.close';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function LessonLayout({ state, dispatch }: Props) {
  const isDemo = useStore(isDemoSelector);
  const { meta: { isDone } } = state;

  return (
    <>
      <Header prefix="lesson">
        <LessonQueue state={state} />
        <LessonProgress state={state} />
        <div className="lesson__controls">
          <LessonTerminateDialog
            isNecessary={!isDone}
            prefix={PREFIX}
            url={urls.home({ isDemo })}
          />
        </div>
      </Header>
      <Main prefix="lesson">
        <LessonContent
          state={state}
          dispatch={dispatch}
        />
      </Main>
    </>
  );
}
