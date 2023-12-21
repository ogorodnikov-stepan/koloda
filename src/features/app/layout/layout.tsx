import { useStore, isLayoutRenderedSelector } from 'features/app/app-store';
import Header from 'features/app/layout/header/header';
import Main from 'features/app/layout/main/main';
import Content from 'features/app/layout/content/content';
import MainMenu from 'features/app/layout/header/menu/main/main-menu';
import SecondaryMenu from 'features/app/layout/header/menu/secondary/secondary-menu';
import Logo from 'features/app/layout/header/logo';
import './layout.scss';

export default function Layout() {
  const isLayoutRendered = useStore(isLayoutRenderedSelector);

  if (!isLayoutRendered) return <Content />;

  return (
    <>
      <Header>
        <Logo />
        <MainMenu />
        <SecondaryMenu />
      </Header>
      <Main>
        <Content />
      </Main>
    </>
  );
}
