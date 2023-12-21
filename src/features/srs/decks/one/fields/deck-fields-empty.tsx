import { useTranslation } from 'react-i18next';

export default function DeckFieldsEmpty() {
  const { t } = useTranslation('srs');

  return (
    <div className="deck-fields__empty">
      <p>{t('srs:decks.one.fields.many.empty.message')}</p>
    </div>
  );
}
