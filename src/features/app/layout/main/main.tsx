import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';
import './main.scss';

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
