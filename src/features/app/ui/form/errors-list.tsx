import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './button';

interface Props {
  className?: string;
  isError?: boolean;
  errors?: string[];
  errorsDropdown?: boolean;
  errorPrefix?: string;
}

export default function ErrorsList(
  { className, isError, errors, errorsDropdown, errorPrefix }: Props,
) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  if (!isError) return null;

  return (
    <>
      { (isError && errors && errorsDropdown) && (
        <Button
          className={`${className}__errors-toggle`}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        />
      )}
      { (isError && errors) && (
        <ul
          className={`${className}__errors-list`}
          data-is-dropdown={!!errorsDropdown}
          data-is-open={isOpen}
        >
          { errors.map((error) => (
            <li
              key={error}
              className={`${className}__errors-list-item`}
            >
              {t(`${errorPrefix}.${error}`)}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
