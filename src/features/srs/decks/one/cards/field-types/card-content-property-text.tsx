import { EditbarMode } from 'features/app/ui/editbar/editbar';
import TextInput from 'features/app/ui/form/text-input';
import { CardFieldValue } from 'features/srs/srs-types';
import { useTranslation } from 'react-i18next';

const PREFIX = 'srs:decks.one.cards.many.properties.value';

interface Props {
  className?: string;
  label?: React.ReactNode;
  name: string;
  mode: EditbarMode;
  value: CardFieldValue;
  onChange: (value: any) => void;
}

export default function CardContentPropertyText(
  { className, label, mode, name, value, onChange }: Props,
) {
  const { t } = useTranslation('srs');

  return (
    <TextInput
      className={className}
      label={label}
      name={name}
      placeholder={t(`${PREFIX}.placeholder`)}
      readOnly={mode === 'view'}
      data-field-type="text"
      data-is-readonly={mode === 'view'}
      value={value?.text || ''}
      onChange={onChange}
    />
  );
}
