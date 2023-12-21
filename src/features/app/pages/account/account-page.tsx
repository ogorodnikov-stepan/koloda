import usePage from 'features/app/routing/hooks/use-page';
import { PageProps } from 'features/app/app-types';
import Account from 'features/auth/account/account';

export default function AccountPage({ isDemo }: PageProps) {
  const { isLoading } = usePage({ isDemo, isAuthRequired: true });

  if (isLoading) return null;

  return (
    <Account
      isDemo={isDemo}
    />
  );
}
