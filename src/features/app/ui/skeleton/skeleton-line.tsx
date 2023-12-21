import clsx from 'clsx';
import './skeleton.scss';

interface SkeletonLineProps {
  className?: string;
}

export default function SkeletonLine({ className }: SkeletonLineProps) {
  return (
    <div
      className={clsx(className, 'skeleton-line skeleton')}
    />
  );
}
