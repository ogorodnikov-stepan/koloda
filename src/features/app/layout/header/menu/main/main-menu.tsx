import { useMemo } from 'react';
import { useStore, isDemoSelector } from 'features/app/app-store';
import urls from 'features/app/routing/urls';
import { useCurrentUserQuery } from 'features/auth/auth-queries';
import Menu from 'features/app/layout/header/menu/menu';
import SkeletonLine from 'features/app/ui/skeleton/skeleton-line';
import MainMenuItemsNew from './main-menu-items-new';
import './main-menu.scss';

const PREFIX = 'app:layout.header.menu.main';

const userMenu = (params: any) => ([
  { t: `${PREFIX}.home`, url: urls.home(params) },
  { t: `${PREFIX}.decks`, url: urls.decks(params) },
  { t: `${PREFIX}.reppings`, url: urls.reppings(params) },
  { t: `${PREFIX}.new.text`, dropdown: MainMenuItemsNew },
]);

const guestMenu = () => [];

const skeletonMenu = () => (
  userMenu({}).map((x) => ({ t: x.t, component: SkeletonLine }))
);

export default function MainMenu() {
  const isDemo = useStore(isDemoSelector);
  const { isLoading, data } = useCurrentUserQuery({ isDemo });

  const menu = useMemo(() => (
    isLoading
      ? skeletonMenu()
      : (data?.data.uid ? userMenu({ isDemo }) : guestMenu())
  ), [isLoading, isDemo, !!data?.data.uid]);

  if (menu.length === 0) return <div className="main-menu" />;

  return (
    <Menu
      items={menu}
      name="main-menu"
    />
  );
}
