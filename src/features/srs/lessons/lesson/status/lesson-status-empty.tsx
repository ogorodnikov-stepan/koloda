import { useTranslation } from 'react-i18next';

const PREFIX = 'srs:lessons.status.empty';

export default function LessonStatusEmpty() {
  const { t } = useTranslation();

  return (
    <div
      className="lesson__status"
      data-status="empty"
    >
      <span className="lesson__empty-message">
        {t(`${PREFIX}.message`)}
      </span>
    </div>
  );
}
