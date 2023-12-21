import { useParams } from 'react-router-dom';
import usePage from 'features/app/routing/hooks/use-page';
import { RouterParams, PageProps } from 'features/app/app-types';
import OneRepping from 'features/srs/reppings/one/repping';

export default function ReppingPage({ isDemo }: PageProps) {
  const { id } = useParams<RouterParams>();
  const { isLoading } = usePage({ isDemo, isAuthRequired: true });

  if (isLoading) return null;

  return (
    <OneRepping
      id={id}
      isDemo={isDemo}
    />
  );
}
