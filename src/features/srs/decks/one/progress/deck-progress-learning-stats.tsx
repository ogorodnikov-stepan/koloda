import { useTranslation } from 'react-i18next';
import ChartistGraph from 'react-chartist';
import { State } from 'features/srs/decks/one/deck-reducer';
import 'chartist/dist/scss/chartist.scss';

const PREFIX = 'srs:decks.one.progress.learning.stats';
const TYPES = ['initial', 'learning', 'completed'];

interface Props {
  state: State;
}

export default function DeckProgressLearningStats({ state }: Props) {
  const { t } = useTranslation('srs');
  const { meta } = state.learning;

  if (!meta) return null;

  const types = { series: TYPES.map((type: string) => (meta[type])) };

  const options = {
    donut: true,
    donutWidth: '25%',
    ignoreEmptyValues: true,
  };

  return (
    <section className="deck-progress__stats">
      <h3 className="deck-progress__stats-title">
        {t(`${PREFIX}.title`)}
      </h3>
      <div className="deck-progress__types">
        <ChartistGraph
          className="deck-progress__chart"
          data={types}
          options={options}
          type="Pie"
        />
        <ul className="deck-progress__legend">
          { TYPES.map((type: string) => (
            <li
              key={type}
              className="deck-progress__legend-item"
              data-card-type={type}
            >
              <span className="deck-progress__legend-title">
                {t(`${PREFIX}.cards.${type}`)}
              </span>
              <span className="deck-progress__legend-amount">
                {meta[type]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
