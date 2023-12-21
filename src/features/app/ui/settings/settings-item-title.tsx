import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';

interface Props extends BasicProps {
  className?: string;
}

export default function SettingsItemTitle({ className, children }: Props) {
  return (
    <dt className={clsx(className, 'settings__item-title')}>
      { children }
    </dt>
  );
}
