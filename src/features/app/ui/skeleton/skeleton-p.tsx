import clsx from 'clsx';
import SkeletonLine from './skeleton-line';
import './skeleton.scss';

interface SkeletonPProps {
  className?: string;
  lines: number;
}

export function SkeletonP({ lines, className }: SkeletonPProps) {
  return (
    <div
      className={clsx(className, 'skeleton-p')}
    >
      { [...Array(lines).keys()].map((i) => (
        <SkeletonLine
          key={i}
          className="skeleton-p__line"
        />
      ))}
    </div>
  );
}
