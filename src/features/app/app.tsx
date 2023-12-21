import { useEffect, Suspense } from 'react';
import WebFont from 'webfontloader';
import { useCurrentUserQuery } from 'features/auth/auth-queries';
import { useStore, isDemoSelector, setTutorialIsOnSelector } from 'features/app/app-store';
import Layout from 'features/app/layout/layout';
import 'assets/styles/normalize.scss';
import 'assets/styles/main.scss';
import './app.scss';

export default function App() {
  const isDemo = useStore(isDemoSelector);
  const setTutorialIsOn = useStore(setTutorialIsOnSelector);
  const { data } = useCurrentUserQuery({ isDemo });

  useEffect(() => {
    WebFont.load({
      google: { families: ['Inter:100,200,300,400,500,600,700,800,900'] },
      classes: false,
    });
  }, []);

  useEffect(() => {
    setTutorialIsOn(data?.data?.tutorial?.isDone === false);
  }, [data?.data?.tutorial?.isDone]);

  return (
    <Suspense fallback={null}>
      <Layout />
    </Suspense>
  );
}
