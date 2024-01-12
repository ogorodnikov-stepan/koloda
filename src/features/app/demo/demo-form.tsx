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
  const { meta: { status, isLoading, isError } } = state;

  const handleChange = useCallback(({ target: { value } }) => {
    dispatch(['languageUpdated', { value }]);
  }, []);

  const handleSubmit = useCallback(() => {
    dispatch(['dataSubmitted', {}]);
  }, [state.language]);

  return (
    <div className="demo__form">
      <AppLanguageSelect
        label={t(`${PREFIX}.language.label`)}
        disabled={status !== 'idle'}
        value={state.language}
        onChange={handleChange}
      />
      <Button
        className="demo__submit"
        disabled={isLoading || isError}
        onClick={handleSubmit}
        content={t(`${PREFIX}.submit`)}
      />
      <span
        className="demo__status"
        data-status={status}
      >
        {t(`${PREFIX}.status.${status}`)}
      </span>
    </div>
  );
}
