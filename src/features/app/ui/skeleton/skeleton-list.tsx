import clsx from 'clsx';
import SkeletonElement from './skeleton-element';
import './skeleton.scss';

interface SkeletonListProps {
  className?: string;
  items: number;
}

export default function SkeletonList({ items, className }: SkeletonListProps) {
  return (
    <ul
      className={clsx(className, 'skeleton-list')}
    >
      { [...Array(items).keys()].map((i) => (
        <li
          key={i}
          className="skeleton-list__item"
        >
          <SkeletonElement
            className="skeleton-list__item-marker"
          />
          <SkeletonElement
            className="skeleton-list__item-content"
          />
        </li>
      ))}
    </ul>
  );
}
