import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import { Field, Card } from 'features/srs/srs-types';
import Button from 'features/app/ui/form/button';
import DeckCardsProperty from 'features/srs/decks/one/cards/field-types/card-content-property';
import DeckCardsSliderItemProgress from './deck-cards-slider-item-progress';

const PREFIX = 'srs:decks.one.cards.many.slider';

interface Props {
  index: number;
  card: Card;
  fields: Field[];
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckCardsSliderItem(
  { index, card, fields, state, dispatch }: Props,
) {
  const { t } = useTranslation();
  const isLearning = state.learning.data?.repping;
  const { status: { editbar: { mode } } } = state.cards;

  const handleChange = useCallback(({ target: { name, value } }) => {
    dispatch(['cardUpdated', { index, path: name, value }]);
  }, [index]);

  const handleDeleteClick = useCallback(() => {
    dispatch(['cardDeleted', { index }]);
  }, [index]);

  return (
    <div className="deck-cards__slider-card">
      <h3 className="deck-cards__slider-card-title">
        {t(`${PREFIX}.titles.content`)}
      </h3>
      { fields.map((field) => (
        <DeckCardsProperty
          key={field.id}
          className="deck-cards__slider-card-property"
          label={field.title}
          name={`content[${field.id}][0].text`}
          type={field.type}
          mode={mode}
          value={card?.content?.[field.id]?.[0] || {}}
          onChange={handleChange}
        />
      ))}
      { isLearning && (
        <>
          <h3 className="deck-cards__slider-card-title">
            {t(`${PREFIX}.titles.progress`)}
          </h3>
          <DeckCardsSliderItemProgress
            card={card}
            mode={mode}
            dispatch={dispatch}
          />
        </>
      )}
      { (mode === 'edit') && (
        <div className="deck-cards__slider-card-actions">
          <Button
            className="deck-cards__slider-delete delete-button"
            onClick={handleDeleteClick}
            content="Delete card"
          />
        </div>
      )}
    </div>
  );
}
