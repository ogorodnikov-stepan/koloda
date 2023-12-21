export type SelectItem = any;

export type SelectItems = SelectItem[];

export type SelectGetter = (x: any) => string;

export interface SelectProps {
  className?: string;
  name: string;
  label?: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  getKey?: SelectGetter;
  getValue?: SelectGetter;
  items: SelectItems;
  selectedItem: any;
  ValueComponent?: React.FC<{ item: any; }>;
  ItemComponent?: React.FC<{ item: any; }>;
  onChange: (value: any) => void;
}
