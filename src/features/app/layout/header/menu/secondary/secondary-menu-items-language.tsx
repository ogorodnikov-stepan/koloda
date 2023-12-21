import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import AppLanguageSelect from 'features/app/i18n/app-language-select';

export default function SecondaryMenuItemsUser() {
  const { i18n } = useTranslation('app');

  const handleChange = useCallback(({ target: { value } }) => {
    i18n.changeLanguage(value);
  }, []);

  return (
    <AppLanguageSelect
      className="app-language-select"
      value={i18n.language}
      onChange={handleChange}
    />
  );
}
