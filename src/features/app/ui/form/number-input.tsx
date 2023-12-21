import { useCallback } from 'react';
import clsx from 'clsx';
// import Plus from 'assets/images/plus';
// import Minus from 'assets/images/minus';
import Label from './label';
import Button from './button';
import './number-input.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  isError?: boolean;
  step?: number;
}

export default function NumberInput({ className, label, isError, onChange, ...props }: Props) {
  const handleIncrement = useCallback(({ target }) => {
    target.nextElementSibling.stepUp();
    const change = new Event('change', { bubbles: true });
    target.nextElementSibling.dispatchEvent(change);
    target.nextElementSibling.focus();
  }, []);

  const handleDecrement = useCallback(({ target }) => {
    target.previousElementSibling.stepDown();
    const change = new Event('change', { bubbles: true });
    target.previousElementSibling.dispatchEvent(change);
    target.previousElementSibling.focus();
  }, []);

  return (
    <div className={clsx(className, 'number-input')}>
      <Label
        className="number-input__label label"
        label={label}
        id={props.id}
        isError={isError}
      />
      <Button
        className="number-input__increment"
        tabIndex={-1}
        onClick={handleIncrement}
      />
      <input
        className="number-input__value value"
        type="number"
        value={props.value}
        data-is-error={isError}
        onChange={onChange}
        {...props}
      />
      <Button
        className="number-input__decrement"
        tabIndex={-1}
        onClick={handleDecrement}
      />
    </div>
  );
}
