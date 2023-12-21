import { BasicProps } from 'features/app/app-types';
import './main.scss';
import clsx from 'clsx';

interface Props extends BasicProps {
  prefix?: string;
}

export default function Main({ prefix, children }: Props) {
  return (
    <main className={clsx(prefix && `${prefix}-main`, 'app-main')}>
      {children}
    </main>
  );
}
