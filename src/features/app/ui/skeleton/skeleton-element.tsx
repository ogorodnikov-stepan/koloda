import clsx from 'clsx';
import './skeleton.scss';

interface SkeletonElementProps {
  className?: string;
}

export default function SkeletonElement({ className }: SkeletonElementProps) {
  return (
    <div
      className={clsx(className, 'skeleton')}
    />
  );
}
