import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { isDemoSelector, useStore } from 'features/app/app-store';
import urls from 'features/app/routing/urls';
import { useAddDeckMutation } from 'features/srs/decks/decks-queries';
import TextInput from 'features/app/ui/form/text-input';
import Button from 'features/app/ui/form/button';
import './add-deck.scss';

const PREFIX = 'srs:decks.add';
const OPERATION = 'deck_add';

export default function AddDeck() {
  const { t } = useTranslation('srs');
  const { push } = useHistory();
  const isDemo = useStore(isDemoSelector);
  const [deck, setDeck] = useState({ title: '' });
  const { isLoading, error, mutate } = useAddDeckMutation({ isDemo });

  const handleChange = useCallback(({ target: { name, value } }) => {
    setDeck((prev) => ({ ...prev, [name]: value }));
  }, [setDeck]);

  const handleSubmit = useCallback(() => {
    mutate(deck, {
      onSuccess: (r) => {
        push(urls.deck({ isDemo, id: r.data.id }));
      },
    });
  }, [deck, isDemo]);

  return (
    <form className="add-deck">
      <TextInput
        className="add-repping__title"
        name="title"
        label={t(`${PREFIX}.properties.title.label`)}
        placeholder={t(`${PREFIX}.properties.title.placeholder`)}
        isError={!!error?.meta?.errors?.[OPERATION].title}
        errors={error?.meta?.errors?.[OPERATION].title}
        errorPrefix="srs:decks.one.about.properties.title.errors"
        value={deck.title || ''}
        onChange={handleChange}
      />
      <Button
        className="add-repping__submit"
        disabled={isLoading}
        onClick={handleSubmit}
        content={t(`${PREFIX}.submit`)}
      />
    </form>
  );
}
