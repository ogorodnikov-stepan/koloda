import React, { useMemo } from 'react';
import Autocomplete from 'features/app/ui/select/autocomplete';
import { Repping } from 'features/srs/srs-types';

const getValue = (item: any) => (item?.title || '');

interface Props {
  className?: string;
  label?: React.ReactNode;
  readOnly?: boolean;
  reppings?: Repping[] | null;
  value: Repping['id'];
  onChange: (value: any) => void;
}

export default function ReppingSelect(
  { className, label, readOnly, reppings, value, onChange }: Props,
) {
  const item = useMemo(() => (
    reppings
      ? value ? reppings.find((e) => (e.id === value)) : reppings[0]
      : null
  ), [reppings, value]);

  if (!reppings || !item) return null;

  return (
    <Autocomplete
      className={className}
      name="reppingId"
      label={label}
      readOnly={readOnly}
      items={reppings}
      selectedItem={item}
      onChange={onChange}
      getValue={getValue}
    />
  );
}
