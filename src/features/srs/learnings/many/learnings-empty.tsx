import { useTranslation } from 'react-i18next';

export default function LearningsEmpty() {
  const { t } = useTranslation('srs');

  return (
    <div className="learnings__no-items">
      <p>{t('srs:learnings.many.empty.message')}</p>
    </div>
  );
}
