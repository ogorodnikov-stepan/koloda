import { useTranslation } from 'react-i18next';
import { State } from 'features/srs/lessons/lesson/lesson-reducer';

const PREFIX = 'srs:lessons.status.pedning';

interface Props {
  state: State;
}

export default function LessonStatusPending({ state }: Props) {
  const { t } = useTranslation();
  const { meta: { pendingDeck, pendingRepping } } = state;

  return (
    <div className="lesson__pending">
      <span className="lesson__pending-message">
        {t(`${PREFIX}.message`)}
      </span>
    </div>
  );
}
