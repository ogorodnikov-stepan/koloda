import usePage from 'features/app/routing/hooks/use-page';
import { PageProps } from 'features/app/app-types';
import Learnings from 'features/srs/learnings/many/learnings';

export default function Dashboard({ isDemo }: PageProps) {
  const { isLoading } = usePage({ isDemo, isAuthRequired: true });

  if (isLoading) return null;

  return (
    <Learnings
      isDemo={isDemo}
    />
  );
}
