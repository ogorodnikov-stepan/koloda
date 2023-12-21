import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';

interface Props extends BasicProps {
  className: string;
  mode?: string;
}

export default function FeatureSection({ className, mode, children }: Props) {
  return (
    <div
      className={clsx(className, 'feature__subsection')}
      data-mode={mode}
    >
      {children}
    </div>
  );
}
