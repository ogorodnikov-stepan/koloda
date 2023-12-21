import clsx from 'clsx';
import './skeleton.scss';

interface SkeletonButtonProps {
  className?: string;
}

export default function SkeletonButton({ className }: SkeletonButtonProps) {
  return (
    <div
      className={clsx(className, 'skeleton-button skeleton')}
    />
  );
}
