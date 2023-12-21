// import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import SkeletonLine from 'features/app/ui/skeleton/skeleton-line';
import { State } from './lesson-reducer';

interface Props {
  state: State;
  // dispatch: ReducerDispatch;
}

export default function LessonLoader({ state }: Props) {
  const { plan, decks, reppings } = state;

  return (
    <div className="lesson-loader">
      <div className="lesson-loader__content">
        <ul className="lesson-loader__decks">
          { plan.map((deck) => (
            <li className="lesson-loader__decks-item">
              { decks[deck.deckId].isLoaded ? (
                <span>decks[deck.id].data.title</span>
              ) : (
                <SkeletonLine />
              )}
              { reppings[deck.reppingId].isLoaded ? (
                <span>reppings[deck.reppingId].data.title</span>
              ) : (
                <SkeletonLine />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
