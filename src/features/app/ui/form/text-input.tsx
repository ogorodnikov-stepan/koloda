import clsx from 'clsx';
import Label from './label';
import ErrorsList from './errors-list';
import './text-input.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  isError?: boolean;
  errors?: string[];
  errorsDropdown?: boolean;
  errorPrefix?: string;
}

export default function TextInput(
  { className, id, label, isError, errors, errorsDropdown, errorPrefix, ...props }: Props,
) {
  return (
    <div className={clsx(className, 'text-input')}>
      <Label
        className={clsx(
          className && `${className}-label`,
          'text-input__label label',
        )}
        id={id}
        label={label}
        isError={isError}
      />
      <input
        className={clsx(
          className && `${className}-value`,
          'text-input__value value',
        )}
        type={props.type || 'input'}
        id={id}
        value={props.value || ''}
        data-is-error={isError}
        {...props}
      />
      <ErrorsList
        className="text-input"
        isError={isError}
        errors={errors}
        errorsDropdown={errorsDropdown}
        errorPrefix={errorPrefix}
      />
    </div>
  );
}
