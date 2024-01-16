import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { FilterValue } from 'features/app/reducer/reducer-filters';
import { useLanguagesQuery } from 'features/srs/decks/decks-queries';
import Autocomplete from 'features/app/ui/select/autocomplete';

const PREFIX = 'srs:decks.selects.language';

interface Props {
  className?: string;
  label?: React.ReactNode;
  readOnly?: boolean;
  hasNullOption?: boolean;
  value?: FilterValue;
  onChange: (x: FilterValue) => void;
}

export default function LanguageSelect(
  { className, label, readOnly, hasNullOption, value, onChange }: Props,
) {
  const { i18n: { language }, t } = useTranslation('srs');
  const { data } = useLanguagesQuery({ language });

  const items = useMemo(() => {
    if (!data?.data) return null;
    return hasNullOption
      ? [{ id: null, value: t(`${PREFIX}.items.none`) }, ...data.data]
      : data.data;
  }, [data, hasNullOption, t]);

  const selectedItem = useMemo(() => (
    items
      ? items.find((e: any) => (e.id === value)) || items[0]
      : null
  ), [items, value, hasNullOption]);

  if (!items) return null;

  return (
    <Autocomplete
      className={clsx(className, 'language-select')}
      name="languageId"
      label={label || t(`${PREFIX}.label`)}
      readOnly={readOnly}
      items={items}
      selectedItem={selectedItem}
      onChange={onChange}
    />
  );
}
