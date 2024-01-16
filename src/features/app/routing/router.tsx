import { lazy, Suspense } from 'react';
import { Switch, Route, SwitchProps } from 'react-router-dom';
import urls from 'features/app/routing/urls';

const Front = lazy(() => import('features/app/pages/front/front'));
const Account = lazy(() => import('features/app/pages/account/account-page'));
const Dashboard = lazy(() => import('features/app/pages/dashboard/dashboard'));
const Decks = lazy(() => import('features/app/pages/decks/decks-page'));
const Deck = lazy(() => import('features/app/pages/decks/deck-page'));
const Reppings = lazy(() => import('features/app/pages/reppings/reppings-page'));
const Repping = lazy(() => import('features/app/pages/reppings/repping-page'));
const Divel = lazy(() => import('features/app/pages/reppings/divel-page'));
const Lesson = lazy(() => import('features/app/pages/lessons/lesson-page'));

const isDemo = true;

export default function Router(props: SwitchProps) {
  return (
    <Switch location={props.location}>
      <Route path={urls.home({})} exact>
        <Suspense fallback={null}><Front /></Suspense>
      </Route>
      <Route path={urls.home({ isDemo })} exact>
        <Suspense fallback={null}><Front isDemo /></Suspense>
      </Route>
      <Route path={urls.account({})} exact>
        <Suspense fallback={null}><Account /></Suspense>
      </Route>
      <Route path={urls.account({ isDemo })} exact>
        <Suspense fallback={null}><Account isDemo /></Suspense>
      </Route>
      <Route path={urls.dashboard({ isDemo })} exact>
        <Suspense fallback={null}><Dashboard isDemo /></Suspense>
      </Route>
      <Route path={urls.divel({ reppingId: ':reppingId', id: ':id', isDemo })}>
        <Suspense fallback={null}><Divel isDemo /></Suspense>
      </Route>
      <Route path={urls.repping({ id: ':id', isDemo })}>
        <Suspense fallback={null}><Repping isDemo /></Suspense>
      </Route>
      <Route path={urls.reppings({ isDemo })}>
        <Suspense fallback={null}><Reppings isDemo /></Suspense>
      </Route>
      <Route path={urls.deck({ id: ':id', isDemo })}>
        <Suspense fallback={null}><Deck isDemo /></Suspense>
      </Route>
      <Route path={urls.decks({ isDemo })}>
        <Suspense fallback={null}><Decks isDemo /></Suspense>
      </Route>
      <Route path={urls.lesson({ type: ':type', isDemo })}>
        <Suspense fallback={null}><Lesson isDemo /></Suspense>
      </Route>
      <Route path={urls.divel({ reppingId: ':reppingId', id: ':id' })}>
        <Suspense fallback={null}><Divel /></Suspense>
      </Route>
      <Route path={urls.repping({ id: ':id' })}>
        <Suspense fallback={null}><Repping /></Suspense>
      </Route>
      <Route path={urls.reppings({})}>
        <Suspense fallback={null}><Reppings /></Suspense>
      </Route>
      <Route path={urls.deck({ id: ':id' })}>
        <Suspense fallback={null}><Deck /></Suspense>
      </Route>
      <Route path={urls.decks({})}>
        <Suspense fallback={null}><Decks /></Suspense>
      </Route>
    </Switch>
  );
}
