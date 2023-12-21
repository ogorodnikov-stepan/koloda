import { useTranslation } from 'react-i18next';
import Select from 'features/app/ui/select/select';
import { SelectItems } from 'features/app/ui/select/select-types';

const PREFIX = 'app:ui.feature.many.options.sorting';

const getKey = (item: any) => (item);

interface Props {
  items: SelectItems;
  item: string;
  getValue: (value: string) => string;
  onChange: (value: any) => void;
}

export default function ManyOptionsSorting({ items, item, getValue, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <Select
      className="many__sorting"
      name="sort"
      label={t(`${PREFIX}.label`)}
      items={items}
      selectedItem={item}
      getKey={getKey}
      getValue={getValue}
      onChange={onChange}
    />
  );
}
