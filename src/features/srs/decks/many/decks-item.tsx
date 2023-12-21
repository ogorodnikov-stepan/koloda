import { useTranslation } from 'react-i18next';
import { int } from 'features/app/misc/misc';
import urls from 'features/app/routing/urls';
import { isDemoSelector, useStore } from 'features/app/app-store';
import { Deck } from 'features/srs/srs-types';
import Many from 'features/app/ui/feature/many/many';

const PREFIX = 'srs:decks.many.list';

interface Props {
  deck: Deck;
}

export default function DecksItem({ deck }: Props) {
  const { t } = useTranslation();
  const isDemo = useStore(isDemoSelector);

  return (
    <Many.ListItemLink
      entity="decks"
      to={urls.deck({ isDemo, id: deck.id })}
    >
      <span className="decks__item-title">
        {deck.title}
      </span>
      <span className="decks__item-cards">
        {t(`${PREFIX}.cards`, { count: int(deck.cardsTotal) })}
      </span>
      <span className="decks__item-fields">
        {t(`${PREFIX}.fields`, { count: int(deck.fieldsTotal) })}
      </span>
    </Many.ListItemLink>
  );
}
