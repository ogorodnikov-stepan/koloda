import { useTranslation } from 'react-i18next';

export default function DeckCardsNoFields() {
  const { t } = useTranslation('srs');

  return (
    <div className="deck-cards__no-fields">
      <p>{t('decks.one.cards.many.noFields.message')}</p>
    </div>
  );
}
