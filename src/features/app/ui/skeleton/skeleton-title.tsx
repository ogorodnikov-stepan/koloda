import clsx from 'clsx';
import './skeleton.scss';

interface SkeletonTitleProps {
  className?: string;
}

export default function SkeletonTitle({ className }: SkeletonTitleProps) {
  return (
    <div
      className={clsx(className, 'skeleton-title skeleton')}
    />
  );
}
