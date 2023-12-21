import { useParams } from 'react-router-dom';
import usePage from 'features/app/routing/hooks/use-page';
import { RouterParams, PageProps } from 'features/app/app-types';
import OneDeck from 'features/srs/decks/one/deck';

export default function DeckPage({ isDemo }: PageProps) {
  const { id } = useParams<RouterParams>();
  const { isLoading } = usePage({ isDemo, isAuthRequired: true });

  if (isLoading) return null;

  return (
    <OneDeck
      id={id}
      isDemo={isDemo}
    />
  );
}
