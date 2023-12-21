import { isDemoSelector, useStore } from 'features/app/app-store';
import { useCurrentUserQuery } from 'features/auth/auth-queries';
import Dropdown from 'features/app/ui/dropdown/dropdown';
import SecondaryMenuItemsUser from './secondary-menu-items-user';
import SecondaryMenuItemsLanguage from './secondary-menu-items-language';
import './secondary-menu.scss';

export default function SecondaryMenu() {
  const isDemo = useStore(isDemoSelector);
  const { isLoading, data } = useCurrentUserQuery({ isDemo });

  if (isLoading) return null;

  return (
    <nav className="secondary-menu">
      <ul className="secondary-menu__items">
        <li className="secondary-menu__item">
          <SecondaryMenuItemsLanguage />
        </li>
        { data?.data.uid && (
          <li className="secondary-menu__item">
            <Dropdown
              className="user-menu"
              hasOverlay
              link=""
            >
              <SecondaryMenuItemsUser />
            </Dropdown>
          </li>
        )}
      </ul>
    </nav>
  );
}
