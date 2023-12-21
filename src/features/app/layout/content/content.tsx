import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { isDemoSelector, useStore } from 'features/app/app-store';
import Router from 'features/app/routing/router';
import './content.scss';
import { useCurrentUserQuery } from 'features/auth/auth-queries';
import Error from 'features/app/pages/error/error';

const TRANSITION_DELAY = 200;

export default function Content() {
  const location = useLocation();
  const isDemo = useStore(isDemoSelector);
  const { isError, error } = useCurrentUserQuery({ isDemo });
  const ref = useRef(null);

  if (isError && error?.status) return <Error status={error.status} />;

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        classNames="route-transition"
        nodeRef={ref}
        timeout={TRANSITION_DELAY}
      >
        <Router
          location={location}
        />
      </CSSTransition>
    </SwitchTransition>
  );
}
