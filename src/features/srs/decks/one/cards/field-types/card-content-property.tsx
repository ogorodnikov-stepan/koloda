import { EditbarMode } from 'features/app/ui/editbar/editbar';
import { Field } from 'features/srs/srs-types';
import { useMemo } from 'react';
import Text from './card-content-property-text';

const COMPONENTS = {
  1: Text,
};

interface Props {
  className?: string;
  label?: React.ReactNode;
  type: Field['type'];
  name: string;
  mode: EditbarMode;
  value: any;
  onChange: (value: any) => void;
}

export default function CardContentProperty(
  { className, label, type, name, mode, value, onChange }: Props,
) {
  const Component = useMemo(() => (COMPONENTS?.[type]), [type]);

  return (
    <Component
      className={className}
      label={label}
      mode={mode}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}
