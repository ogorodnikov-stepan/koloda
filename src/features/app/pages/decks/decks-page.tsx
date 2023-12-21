import usePage from 'features/app/routing/hooks/use-page';
import { PageProps } from 'features/app/app-types';
import ManyDecks from 'features/srs/decks/many/decks';

export default function DecksPage({ isDemo }: PageProps) {
  const { isLoading } = usePage({ isDemo, isAuthRequired: true });

  if (isLoading) return null;

  return (
    <ManyDecks
      isDemo={isDemo}
    />
  );
}
