import { SkeletonP } from 'features/app/ui/skeleton/skeleton-p';

export default function DeckProgressSkeleton() {
  return (
    <SkeletonP
      className="deck-summary-skeleton feature__section-skeleton"
      lines={3}
    />
  );
}
