import { State } from 'features/srs/lessons/lesson/lesson-reducer';

interface Props {
  state: State;
}

export default function LessonProgressBar({ state }: Props) {
  const { progress: { cardsTotal, cardsDone, percentage } } = state;

  return (
    <div className="lesson__progress">
      <div className="lesson__progress-bar">
        <div
          className="lesson__progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="lesson__progress-text">
        {`${cardsDone} / ${cardsTotal}`}
      </span>
    </div>
  );
}
