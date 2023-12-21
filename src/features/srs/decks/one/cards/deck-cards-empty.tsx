import { useTranslation } from 'react-i18next';

export default function DeckCardsEmpty() {
  const { t } = useTranslation('srs');

  return (
    <div className="deck-cards__empty">
      <p>{t('decks.one.cards.many.empty.message')}</p>
    </div>
  );
}
