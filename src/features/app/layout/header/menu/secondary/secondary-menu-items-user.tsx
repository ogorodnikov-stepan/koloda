import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useHistory, NavLink } from 'react-router-dom';
import { isDemoSelector, useStore } from 'features/app/app-store';
import urls from 'features/app/routing/urls';
import Avatar from 'features/auth/profile/avatar/avatar';
import { useCurrentUserQuery, useLogoutMutation } from 'features/auth/auth-queries';
import Button from 'features/app/ui/form/button';

const PREFIX = 'app:layout.header.menu.secondary.user';

export default function SecondaryMenuItemsUser() {
  const { t } = useTranslation('app');
  const { push } = useHistory();
  const queryClient = useQueryClient();
  const isDemo = useStore(isDemoSelector);
  const { data } = useCurrentUserQuery({ isDemo });
  const { mutate } = useLogoutMutation({ isDemo });
  const { profile } = data?.data || {};

  const handleLogout = useCallback(() => {
    mutate({}, { onSuccess: () => {
      queryClient.resetQueries(['users', 'current']);
      push(urls.home({ isDemo }));
    } });
  }, [isDemo]);

  return (
    <>
      { profile && (
        <div className="user-menu__user">
          <Avatar
            className="user-menu__user-avatar"
            profile={profile}
          />
          <span className="user-menu__user-full-name">
            {profile.fullName}
          </span>
        </div>
      )}
      <ul className="user-menu__items">
        <li className="user-menu__item">
          <NavLink
            className="user-menu__profile user-menu__link"
            to={urls.account({ isDemo })}
            activeClassName="active"
            exact
          >
            {t(`${PREFIX}.profile`)}
          </NavLink>
        </li>
        <li className="user-menu__item">
          <Button
            className="user-menu__logout user-menu__link"
            onClick={handleLogout}
            content={t(`${PREFIX}.logout`)}
          />
        </li>
      </ul>
    </>
  );
}
