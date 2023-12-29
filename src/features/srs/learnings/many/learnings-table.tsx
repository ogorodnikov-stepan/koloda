import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import urls from 'features/app/routing/urls';
import { isDemoSelector, useStore } from 'features/app/app-store';
import { LESSON_INITIAL_TYPE, LESSON_LEARNING_TYPE } from 'features/srs/lessons/lessons-defaults';
import { State } from 'features/srs/learnings/many/learnings-reducer';
import LessonBadge from 'features/srs/lessons/badges/lesson-badge';
import LearningsEmpty from './learnings-empty';

const PREFIX = 'srs:learnings.many.table';

interface Props {
  state: State;
}

export default function LearningsTable({ state }: Props) {
  const { t } = useTranslation();
  const isDemo = useStore(isDemoSelector);
  const { decks: { data } } = state;

  if (!data) return <LearningsEmpty />;

  return (
    <div className="learnings__content">
      <table className="learnings__table">
        <thead>
          <tr
            className="learnings__table-row"
            data-cell-type="head"
          >
            { ['title', 'new', 'rep'].map((col) => (
              <td
                key={col}
                className="learnings__table-cell"
                data-cell-type="head"
                data-cell-column={col === 'title' ? 'title' : 'badge'}
              >
                {t(`${PREFIX}.captions.${col}`)}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          { data.map((deck) => (
            <tr
              key={deck.id}
              className="learnings__table-row"
            >
              <td
                className="learnings__table-cell"
                data-cell-type="body"
                data-cell-column="title"
              >
                <Link
                  className="learnings__table-item-title"
                  to={urls.deck({ id: deck.id, isDemo })}
                >
                  {deck.title}
                </Link>
              </td>
              <td
                className="learnings__table-cell"
                data-cell-type="body"
                data-cell-column="badge"
              >
                <LessonBadge
                  type="new"
                  amount={deck.initial}
                  link={urls.lesson({ type: LESSON_INITIAL_TYPE, deck: deck.id, isDemo })}
                />
              </td>
              <td
                className="learnings__table-cell"
                data-cell-type="body"
                data-cell-column="badge"
              >
                <LessonBadge
                  type="rep"
                  amount={deck.learning}
                  link={urls.lesson({ type: LESSON_LEARNING_TYPE, deck: deck.id, isDemo })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
