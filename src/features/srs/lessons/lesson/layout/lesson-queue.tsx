import { useReducer, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useClickAway } from 'react-use';
import { State } from 'features/srs/lessons/lesson/lesson-reducer';
import Button from 'features/app/ui/form/button';
import LessonQueueTable from './lesson-queue-table';

interface Props {
  state: State;
}

export default function LessonQueue({ state }: Props) {
  const location = useLocation();
  const [isOpen, handleClick] = useReducer((s) => (!s), false);
  const ref = useRef(null);
  const { queue: { deck, repping }, meta: { isStarted, isDone } } = state;
  const isDisabled = isDone && !isStarted;

  useClickAway(ref, () => {
    if (isOpen) handleClick();
  });

  useEffect(() => {
    if (isOpen) handleClick();
  }, [location.pathname]);

  return (
    <div className="lesson__queue dropdown" ref={ref}>
      <Button
        className="lesson__queue-button dropdown__toggle"
        data-is-open={isOpen}
        data-is-done={!(deck || repping)}
        disabled={isDisabled}
        onClick={handleClick}
      />
      { !isDisabled && (
        <div
          className="lesson__queue-content dropdown__content"
          data-is-open={isOpen}
        >
          <LessonQueueTable state={state} />
        </div>
      )}
    </div>
  );
}
