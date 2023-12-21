import { useMemo } from 'react';
import { FilterValue } from 'features/app/reducer/reducer-filters';
import { useLanguagesQuery } from 'features/app/app-queries';
import Select from 'features/app/ui/select/select';
import AppLanguageSelectItem from './app-language-select-item';
import './app-language-select.scss';

interface Props {
  className?: string;
  label?: React.ReactNode;
  value?: FilterValue;
  onChange: (x: FilterValue) => void;
}

export default function AppLanguageSelect(
  { className, label, value, onChange }: Props,
) {
  const { data: { data } = {} } = useLanguagesQuery();

  const selectedItem = useMemo(() => (
    data?.find((e: any) => (e?.id === value))
  ), [data, value]);

  if (!data) return null;

  return (
    <Select
      className={className}
      name="language"
      label={label}
      items={data}
      selectedItem={selectedItem}
      ValueComponent={AppLanguageSelectItem}
      ItemComponent={AppLanguageSelectItem}
      onChange={onChange}
    />
  );
}
