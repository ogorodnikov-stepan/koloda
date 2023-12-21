import SkeletonTable from 'features/app/ui/skeleton/skeleton-table';

export default function DeckCardsSkeleton() {
  return (
    <SkeletonTable
      rows={10}
      cols={3}
    />
  );
}
