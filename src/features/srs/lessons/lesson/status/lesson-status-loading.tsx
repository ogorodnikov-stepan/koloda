import { useTranslation } from 'react-i18next';

const PREFIX = 'srs:lessons.status.loading';

export default function LessonStatusLoading() {
  const { t } = useTranslation();

  return (
    <div className="lesson__loading">
      <span className="lesson__loading-message">
        {t(`${PREFIX}.message`)}
      </span>
    </div>
  );
}
