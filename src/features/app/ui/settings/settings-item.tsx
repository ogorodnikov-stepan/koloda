import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';

interface Props extends BasicProps {
  className?: string;
}

export default function SettingsItem({ className, children }: Props) {
  return (
    <div className={clsx(className, 'settings__item')}>
      { children }
    </div>
  );
}
