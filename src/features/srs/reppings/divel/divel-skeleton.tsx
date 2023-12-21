// import SkeletonElement from 'features/app/ui/skeleton/skeleton-element';
import SkeletonLine from 'features/app/ui/skeleton/skeleton-line';
import SkeletonList from 'features/app/ui/skeleton/skeleton-list';
import SkeletonTitle from 'features/app/ui/skeleton/skeleton-title';

const PHASES_COUNT = 3;

export default function PhasesSkeleton() {
  return (
    <div className="phases-skeleton">
      { [...Array(PHASES_COUNT).keys()].map((i) => (
        <div
          key={i}
          className="phases-skeleton__item"
        >
          <SkeletonTitle />
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonList
            items={3}
          />
        </div>
      ))}
    </div>
  );
}
