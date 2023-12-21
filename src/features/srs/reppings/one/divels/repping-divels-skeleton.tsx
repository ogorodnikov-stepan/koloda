import SkeletonList from 'features/app/ui/skeleton/skeleton-list';

export default function ReppingDivelsSkeleton() {
  return (
    <div className="divels-skeleton">
      <SkeletonList
        items={3}
      />
    </div>
  );
}
