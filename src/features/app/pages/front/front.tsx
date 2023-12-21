import { useEffect } from 'react';
import { setIsDemoSelector, useStore } from 'features/app/app-store';
import { PageProps } from 'features/app/app-types';
import { useCurrentUserQuery } from 'features/auth/auth-queries';
import Auth from 'features/auth/authentication/authentication';
import Learnings from 'features/srs/learnings/many/learnings';
import Demo from 'features/app/demo/demo';
import './front.scss';

export default function Front({ isDemo }: PageProps) {
  const setIsDemo = useStore(setIsDemoSelector);
  const { isLoading, data } = useCurrentUserQuery({ isDemo });

  useEffect(() => { setIsDemo(!!isDemo); }, [isDemo]);

  if (isLoading) return null;

  return data?.data.uid ? (
    <Learnings isDemo />
  ) : (
    isDemo ? (
      <Demo />
    ) : (
      <Auth />
    )
  );
}
