import SkeletonTable from 'features/app/ui/skeleton/skeleton-table';

export default function DeckFieldsSkeleton() {
  return (
    <SkeletonTable
      rows={5}
      cols={3}
    />
  );
}
