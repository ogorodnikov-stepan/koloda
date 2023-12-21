import { useTranslation } from 'react-i18next';
import { State } from 'features/srs/lessons/lesson/lesson-reducer';

const PREFIX = 'srs:lessons.queue';
const COLUMNS = ['title', 'cards', 'repping'];

interface Props {
  state: State;
}

export default function LessonQueueTable({ state }: Props) {
  const { t } = useTranslation();
  const { plan, decks, reppings } = state;

  return (
    <table className="lesson__queue-table">
      <thead className="lesson__queue-table-head">
        <tr
          className="lesson__queue-table-row"
          data-row-type="head"
        >
          {COLUMNS.map((column) => (
            <td
              key={column}
              className="lesson__queue-table-cell"
              data-cell-type="head"
              data-cell-column={column}
            >
              <span className="lesson__queue-table-cell-value">
                {t(`${PREFIX}.captions.${column}`)}
              </span>
            </td>
          ))}
        </tr>
      </thead>
      <tbody className="lesson__queue-table-body">
        { plan.map(({ title, deckId, reppingId }) => (
          <tr
            key={deckId}
            className="lesson__queue-table-row"
            data-row-type="body"
          >
            <td
              className="lesson__queue-table-cell"
              data-cell-type="body"
              data-cell-column="title"
            >
              <span className="lesson__queue-table-cell-value">
                {title}
              </span>
            </td>
            <td
              className="lesson__queue-table-cell"
              data-cell-type="body"
              data-cell-column="cards"
            >
              <span
                className="lesson__queue-table-cell-value"
                data-is-loaded={!!decks[deckId]}
              />
            </td>
            <td
              className="lesson__queue-table-cell"
              data-cell-type="body"
              data-cell-column="repping"
            >
              <span
                className="lesson__queue-table-cell-value"
                data-is-loaded={!!reppings[reppingId]}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
