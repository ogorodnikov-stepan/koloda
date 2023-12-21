import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore, setIsDemoSelector } from 'features/app/app-store';
import { useCurrentUserQuery } from 'features/auth/auth-queries';
import urls from 'features/app/routing/urls';

interface Props {
  isDemo?: boolean;
  isAuthRequired?: boolean;
}

export default function usePage({ isDemo, isAuthRequired }: Props) {
  const { push } = useHistory();
  const setIsDemo = useStore(setIsDemoSelector);
  const { isLoading, data } = useCurrentUserQuery({ isDemo });

  useEffect(() => { setIsDemo(!!isDemo); }, [isDemo]);

  useEffect(() => {
    if (isAuthRequired && !isLoading && !data?.data.uid) {
      push(urls.home({ isDemo }));
    }
  }, [isAuthRequired, isDemo, isLoading, data?.data.uid]);

  return { isLoading: isAuthRequired && isLoading };
}
