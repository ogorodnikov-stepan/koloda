/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback } from 'react';
import { useSelect } from 'downshift';
import clsx from 'clsx';
import { SelectGetter, SelectProps } from './select-types';
import './select.scss';

const getKeyDefault: SelectGetter = (item) => (item?.id || '');
const getValueDefault: SelectGetter = (item) => (item?.value || '');

export default function Select(
  { className, name, ValueComponent, ItemComponent, ...props }: SelectProps,
) {
  const getKey = props.getKey || getKeyDefault;
  const getValue = props.getValue || getValueDefault;

  const labelClassName = clsx(className && `${className}-label`, 'select__label label');
  const valueClassName = clsx(className && `${className}__value`, 'select__value');
  const itemsClassName = clsx(className && `${className}__items`, 'select__items');
  const itemClassName = clsx(className && `${className}__item`, 'select__item');

  const onChange = useCallback(({ selectedItem }) => {
    props.onChange({ target: { name, value: getKey(selectedItem), item: selectedItem } });
  }, [name, props.onChange, getKey]);

  const {
    getLabelProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    isOpen,
    selectedItem,
    highlightedIndex,
    toggleMenu,
  } = useSelect({
    items: props.items,
    initialSelectedItem: props.selectedItem,
    selectedItem: props.selectedItem,
    itemToString: getValue,
    onSelectedItemChange: onChange,
  });

  return (
    <div
      className={clsx(className, 'select')}
      data-is-open={isOpen}
      data-is-readonly={!!props.readOnly}
    >
      { props.label && (
        <label {...getLabelProps({ className: labelClassName })}>
          {props.label}
        </label>
      )}
      <div className="select__content">
        <button
          className="select__control"
          disabled={props.disabled || props.readOnly}
          onClick={toggleMenu}
          {...getToggleButtonProps()}
        >
          <span className={valueClassName}>
            { ValueComponent ? (
              <ValueComponent item={selectedItem} />
            ) : (
              getValue(selectedItem)
            )}
          </span>
        </button>
        <ul {...getMenuProps({ className: itemsClassName })}>
          { isOpen && props.items.map((item, index) => (
            <li
              key={getKey(item)}
              data-is-highlighted={highlightedIndex === index}
              data-is-selected={selectedItem === item}
              {...getItemProps({
                className: itemClassName,
                item,
                index,
              })}
            >
              { ItemComponent ? (
                <ItemComponent item={item} />
              ) : (
                getValue(item)
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
