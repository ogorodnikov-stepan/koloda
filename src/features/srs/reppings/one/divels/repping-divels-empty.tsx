import { useTranslation } from 'react-i18next';

export default function ReppingDivelsEmpty() {
  const { t } = useTranslation();

  return (
    <div className="divels__empty">
      <p>{t('srs:divels.many.empty.message')}</p>
    </div>
  );
}
