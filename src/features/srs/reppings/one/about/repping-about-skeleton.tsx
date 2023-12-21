import { SkeletonP } from 'features/app/ui/skeleton/skeleton-p';

export default function ReppingAboutSkeleton() {
  return (
    <SkeletonP
      className="repping-about-skeleton feature__section-skeleton"
      lines={5}
    />
  );
}
