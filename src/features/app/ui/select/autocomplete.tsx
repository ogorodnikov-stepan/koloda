/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback, useState, useEffect } from 'react';
import clsx from 'clsx';
import { useCombobox } from 'downshift';
import { SelectGetter, SelectItems, SelectProps } from './select-types';
import './autocomplete.scss';

export interface AutocompleteProps extends SelectProps {
  wrapperId?: string;
  className?: string;
}

const getKeyDefault: SelectGetter = (item) => (item?.id || '');
const getValueDefault: SelectGetter = (item) => (item?.value || '');

const filterItems = (items: SelectItems, itemToString: SelectGetter, inputValue: string) => (
  items.filter((item) => (
    itemToString(item)
      .toLowerCase()
      .startsWith(inputValue.toLowerCase())
  ))
);

const isOpenChangeTypes = [
  useCombobox.stateChangeTypes.ToggleButtonClick,
  useCombobox.stateChangeTypes.InputKeyDownArrowDown,
  useCombobox.stateChangeTypes.InputKeyDownArrowUp,
];

export default function Autocomplete({ name, ...props }: AutocompleteProps) {
  const getKey = props.getKey || getKeyDefault;
  const getValue = props.getValue || getValueDefault;

  const onChange = useCallback(({ selectedItem }) => {
    props.onChange({ target: { name, value: selectedItem.id, item: selectedItem } });
  }, [name, props.onChange]);

  const [items, setItems] = useState(props.items);
  const [inputValue, setInputValue] = useState('');
  const {
    getLabelProps,
    getComboboxProps,
    getInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    isOpen,
    selectedItem,
    highlightedIndex,
    toggleMenu,
  } = useCombobox({
    items,
    inputValue,
    initialSelectedItem: props.selectedItem,
    selectedItem: props.selectedItem,
    itemToString: getValue,
    onSelectedItemChange: onChange,
    onInputValueChange: (changes: any) => { setInputValue(changes.inputValue); },
    onIsOpenChange: (changes: any) => {
      if (changes.isOpen && isOpenChangeTypes.includes(changes.type)) {
        setInputValue('');
      }
    },
  });

  useEffect(() => {
    if (!isOpen) setInputValue(getValue(selectedItem));
  }, [isOpen, selectedItem, getValue]);

  useEffect(() => {
    setItems(filterItems(props.items, getValue, inputValue));
  }, [inputValue, props.items, getValue]);

  return (
    <div
      className={clsx(props.className, 'autocomplete select')}
      data-is-open={isOpen}
      data-is-readonly={!!props.readOnly}
    >
      { props.label && (
        <label {...getLabelProps({ className: 'label' })}>
          {props.label}
        </label>
      )}
      <div {...getComboboxProps({ className: 'autocomplete__content' })}>
        <input
          {...getInputProps({
            className: 'autocomplete__input',
            disabled: props.disabled || props.readOnly,
            placeholder: getValue(selectedItem),
          })}
        />
        <button
          className="autocomplete__control"
          disabled={props.disabled || props.readOnly}
          onClick={toggleMenu}
          {...getToggleButtonProps()}
        />
        <ul {...getMenuProps({ className: 'autocomplete__items select__items' })}>
          { isOpen && items.map((item, index) => (
            <li
              key={getKey(item)}
              data-is-highlighted={highlightedIndex === index}
              data-is-selected={selectedItem === item}
              {...getItemProps({
                className: 'autocomplete__item select__item',
                item,
                index,
              })}
            >
              {getValue(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
