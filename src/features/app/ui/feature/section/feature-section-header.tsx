import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';

interface Props extends BasicProps {
  className: string;
  title: string;
}

export default function FeatureSectionHeader({ className, title, children }: Props) {
  return (
    <div className={clsx(className, 'feature__section-header')}>
      { title && (
        <h2 className={clsx(`${className}__title`, 'feature__section-header-title')}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
