import { useParams } from 'react-router-dom';
import usePage from 'features/app/routing/hooks/use-page';
import { RouterParams, PageProps } from 'features/app/app-types';
import OneDivel from 'features/srs/reppings/divel/divel';

export default function DivelPage({ isDemo }: PageProps) {
  const { id, reppingId } = useParams<RouterParams>();
  const { isLoading } = usePage({ isDemo, isAuthRequired: true });

  if (isLoading) return null;

  return (
    <OneDivel
      divelId={id}
      reppingId={reppingId}
      isDemo={isDemo}
    />
  );
}
