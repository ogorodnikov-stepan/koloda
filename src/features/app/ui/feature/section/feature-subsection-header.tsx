import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';

interface Props extends BasicProps {
  className: string;
  title: string;
}

export default function FeatureSubsectionHeader({ className, title, children }: Props) {
  return (
    <div className={clsx(className, 'feature__subsection-header')}>
      { title && (
        <h3 className={clsx(`${className}__title`, 'feature__subsection-header-title')}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
