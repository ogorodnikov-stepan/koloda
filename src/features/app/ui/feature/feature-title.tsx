import { BasicProps } from 'features/app/app-types';
import SkeletonTitle from 'features/app/ui/skeleton/skeleton-title';

interface Props extends BasicProps {
  isLoading?: boolean;
}

export default function FeatureTitle({ isLoading, children }: Props) {
  if (isLoading) return <SkeletonTitle />;

  return (
    <h1 className="feature__title">
      {children}
    </h1>
  );
}
