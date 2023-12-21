import usePage from 'features/app/routing/hooks/use-page';
import { PageProps } from 'features/app/app-types';
import ManyReppings from 'features/srs/reppings/many/reppings';

export default function ReppingsPage({ isDemo }: PageProps) {
  const { isLoading } = usePage({ isDemo, isAuthRequired: true });

  if (isLoading) return null;

  return (
    <ManyReppings
      isDemo={isDemo}
    />
  );
}
