import { useMemo, useLayoutEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useStore, setIsLayoutRenderedSelector } from 'features/app/app-store';
import usePage from 'features/app/routing/hooks/use-page';
import { RouterParams, PageProps } from 'features/app/app-types';
import Lesson from 'features/srs/lessons/lesson/lesson';

export default function LessonPage({ isDemo }: PageProps) {
  const { type } = useParams<RouterParams>();
  const { search } = useLocation();
  const { isLoading } = usePage({ isDemo, isAuthRequired: true });
  const setIsLayoutRendered = useStore(setIsLayoutRenderedSelector);

  const params = useMemo(() => (
    Object.fromEntries(new URLSearchParams(search))
  ), [search]);

  useLayoutEffect(() => {
    setIsLayoutRendered(false);
    return () => { setIsLayoutRendered(true); };
  }, []);

  if (isLoading) return null;

  return (
    <Lesson
      type={type}
      params={params}
      isDemo={isDemo}
    />
  );
}
