import clsx from 'clsx';
import Label from './label';
import './checkbox.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

export default function Checkbox(
  { className, id, label, checked, disabled, ...props }: Props,
) {
  return (
    <div className={clsx(className, 'checkbox')}>
      <input
        className={clsx(
          className && `${className}-input`,
          'checkbox__input input',
        )}
        type="checkbox"
        id={id}
        checked={!!checked}
        {...props}
      />
      <Label
        className={clsx(
          className && `${className}-label`,
          'checkbox__label label',
        )}
        id={id}
        label={label}
      />
    </div>
  );
}
