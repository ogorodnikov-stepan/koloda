import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import AppLanguageSelect from 'features/app/i18n/app-language-select';
import Button from 'features/app/ui/form/button';
import { State } from './demo-reducer';
import './demo.scss';

const PREFIX = 'app:pages.demo';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DemoForm({ state, dispatch }: Props) {
  const { t } = useTranslation('app');

  const handleChange = useCallback(({ target: { name, value } }) => {
    dispatch(['dataUpdated', { name, value }]);
  }, []);

  const handleSubmit = useCallback(() => {
    dispatch(['dataSubmitted', {}]);
  }, [state.language]);

  return (
    <div className="demo__form">
      <h2 className="demo__form-title">{t(`${PREFIX}.title`)}</h2>
      <AppLanguageSelect
        label={t(`${PREFIX}.language.label`)}
        value={state.language}
        onChange={handleChange}
      />
      <Button
        className="demo__submit"
        onClick={handleSubmit}
        content={t(`${PREFIX}.submit`)}
      />
    </div>
  );
}
