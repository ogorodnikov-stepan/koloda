import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';

interface Props extends BasicProps {
  className: string;
}

export default function FeatureSectionContent({ className, children }: Props) {
  return (
    <div className={clsx(className, 'feature__section-content')}>
      {children}
    </div>
  );
}
