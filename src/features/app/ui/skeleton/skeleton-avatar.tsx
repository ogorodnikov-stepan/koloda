import clsx from 'clsx';
import './skeleton.scss';

interface SkeletonAvatarProps {
  className?: string;
}

export default function SkeletonAvatar({ className }: SkeletonAvatarProps) {
  return (
    <div
      className={clsx(className, 'skeleton-avatar skeleton')}
    />
  );
}
