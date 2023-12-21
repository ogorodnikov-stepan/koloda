import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { isDemoSelector, useStore } from 'features/app/app-store';
import urls from 'features/app/routing/urls';
import { useAddReppingMutation } from 'features/srs/reppings/reppings-queries';
import TextInput from 'features/app/ui/form/text-input';
import Button from 'features/app/ui/form/button';
import './add-repping.scss';

const PREFIX = 'srs:reppings.add';
const OPERATION = 'repping_add';

export default function AddRepping() {
  const { t } = useTranslation('srs');
  const { push } = useHistory();
  const isDemo = useStore(isDemoSelector);
  const [repping, setRepping] = useState({ title: '' });
  const { isLoading, error, mutate } = useAddReppingMutation({ isDemo });

  const handleChange = useCallback(({ target: { name, value } }) => {
    setRepping((prev) => ({ ...prev, [name]: value }));
  }, [setRepping]);

  const handleSubmit = useCallback(() => {
    mutate(repping, {
      onSuccess: (r) => {
        push(urls.repping({ isDemo, id: r.data.id }));
      },
    });
  }, [repping, isDemo]);

  return (
    <form className="add-repping">
      <TextInput
        className="add-repping__title"
        name="title"
        label={t(`${PREFIX}.properties.title.label`)}
        placeholder={t(`${PREFIX}.properties.title.placeholder`)}
        isError={!!error?.meta?.errors?.[OPERATION].title}
        errors={error?.meta?.errors?.[OPERATION].title}
        errorPrefix="srs:reppings.one.about.properties.title.errors"
        value={repping.title || ''}
        onChange={handleChange}
      />
      <Button
        className="add-repping__submit"
        type="submit"
        disabled={isLoading}
        onClick={handleSubmit}
        content={t(`${PREFIX}.submit`)}
      />
    </form>
  );
}
