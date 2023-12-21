import { SelectItem } from 'features/app/ui/select/select-types';

interface Props {
  item: SelectItem;
}

export default function AppLanguageSelectItem({ item }: Props) {
  return (
    <span
      className="app-language-select__language"
      data-language={item.id}
    >
      {item.value}
    </span>
  );
}
