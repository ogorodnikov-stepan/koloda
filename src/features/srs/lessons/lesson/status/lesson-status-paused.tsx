import { useTranslation } from 'react-i18next';

const PREFIX = 'srs:lessons.status.paused';

export default function LessonStatusPaused() {
  const { t } = useTranslation();

  return (
    <div className="lesson__paused">
      <span className="lesson__paused-message">
        {t(`${PREFIX}.message`)}
      </span>
    </div>
  );
}
