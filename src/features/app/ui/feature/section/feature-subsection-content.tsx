import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';

interface Props extends BasicProps {
  className: string;
}

export default function FeatureSubsectionContent({ className, children }: Props) {
  return (
    <div className={clsx(className, 'feature__subsection-content')}>
      {children}
    </div>
  );
}
