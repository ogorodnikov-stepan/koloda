import { useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageProps } from 'features/app/app-types';
import titles from 'features/app/routing/titles';
import { useCurrentUserQuery } from 'features/auth/auth-queries';
import Feature from 'features/app/ui/feature/feature';
import { accountReducer, accountDefault } from './account-reducer';
import AccountContent from './account-content';
import './account.scss';

export default function Account({ isDemo }: PageProps) {
  const { t } = useTranslation();
  const { data } = useCurrentUserQuery({ isDemo });
  const [state, dispatch] = useReducer(accountReducer, accountDefault);
  const { status: { isLoaded } } = state.user;

  useEffect(() => {
    document.title = titles.account(t, { isDemo });
  }, [t, isDemo]);

  useEffect(() => {
    if (data) dispatch(['dataReceived', data]);
  }, [data]);

  return (
    <Feature entity="account">
      <Feature.Content>
        { isLoaded && (
          <AccountContent
            state={state}
            dispatch={dispatch}
          />
        )}
      </Feature.Content>
    </Feature>
  );
}
