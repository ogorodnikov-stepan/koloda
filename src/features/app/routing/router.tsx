import { Switch, Route, SwitchProps } from 'react-router-dom';
import urls from 'features/app/routing/urls';
import Front from 'features/app/pages/front/front';
import Account from 'features/app/pages/account/account-page';
// import SignupEmailStep3 from 'features/auth/signup-email-step-2';
import Dashboard from 'features/app/pages/dashboard/dashboard';
import Decks from 'features/app/pages/decks/decks-page';
import Deck from 'features/app/pages/decks/deck-page';
import Reppings from 'features/app/pages/reppings/reppings-page';
import Repping from 'features/app/pages/reppings/repping-page';
import Divel from 'features/app/pages/reppings/divel-page';
import Lesson from 'features/app/pages/lessons/lesson-page';

const isDemo = true;

export default function Router(props: SwitchProps) {
  return (
    <Switch location={props.location}>
      <Route path={urls.home({})} exact>
        <Front />
      </Route>
      <Route path={urls.home({ isDemo })} exact>
        <Front isDemo />
      </Route>
      <Route path={urls.account({})} exact>
        <Account />
      </Route>
      <Route path={urls.account({ isDemo })} exact>
        <Account isDemo />
      </Route>
      <Route path={urls.dashboard({ isDemo })} exact>
        <Dashboard isDemo />
      </Route>
      <Route path={urls.divel({ reppingId: ':reppingId', id: ':id', isDemo })}>
        <Divel isDemo />
      </Route>
      <Route path={urls.repping({ id: ':id', isDemo })}>
        <Repping isDemo />
      </Route>
      <Route path={urls.reppings({ isDemo })}>
        <Reppings isDemo />
      </Route>
      <Route path={urls.deck({ id: ':id', isDemo })}>
        <Deck isDemo />
      </Route>
      <Route path={urls.decks({ isDemo })}>
        <Decks isDemo />
      </Route>
      <Route path={urls.lesson({ type: ':type', isDemo })}>
        <Lesson isDemo />
      </Route>
      <Route path={urls.divel({ reppingId: ':reppingId', id: ':id' })}>
        <Divel />
      </Route>
      <Route path={urls.repping({ id: ':id' })}>
        <Repping />
      </Route>
      <Route path={urls.reppings({})}>
        <Reppings />
      </Route>
      <Route path={urls.deck({ id: ':id' })}>
        <Deck />
      </Route>
      <Route path={urls.decks({})}>
        <Decks />
      </Route>
    </Switch>
  );
}
