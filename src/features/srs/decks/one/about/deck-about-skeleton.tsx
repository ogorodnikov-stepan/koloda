import { SkeletonP } from 'features/app/ui/skeleton/skeleton-p';

export default function DeckAboutSkeleton() {
  return (
    <SkeletonP
      className="deck-summary-skeleton feature__section-skeleton"
      lines={5}
    />
  );
}
