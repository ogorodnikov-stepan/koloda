import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';
import './header.scss';

interface Props extends BasicProps {
  prefix?: string;
}

export default function Header({ prefix, children }: Props) {
  return (
    <header className={clsx(prefix && `${prefix}-header`, 'app-header')}>
      <div
        className={clsx(prefix && `${prefix}-header__content`, 'app-header__content')}
      >
        {children}
      </div>
    </header>
  );
}
