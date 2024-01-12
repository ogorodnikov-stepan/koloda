import { useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import urls from 'features/app/routing/urls';
import Feature from 'features/app/ui/feature/feature';
import { demoReducer, demoInit } from './demo-reducer';
import DemoForm from './demo-form';
import DemoSetup from './demo-setup';
import './demo.scss';

const PREFIX = 'app:pages.demo';
const COMPLETION_FADE_TIME = 800;

export default function Demo() {
  const { t, i18n: { language } } = useTranslation();
  const { push } = useHistory();
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(demoReducer, { language }, demoInit);
  const { meta: { isLoading, isDone } } = state;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDone) {
        queryClient.resetQueries(['users', 'current']);
        push(urls.home({ isDemo: true }));
      }
    }, COMPLETION_FADE_TIME);
    return () => clearTimeout(timer);
  }, [isDone]);

  return (
    <Feature entity="demo">
      <Feature.Header>
        <Feature.Title>
          {t(`${PREFIX}.title`)}
        </Feature.Title>
      </Feature.Header>
      <Feature.Content>
        <Feature.Section className="demo">
          <div className="demo__content">
            <DemoForm
              state={state}
              dispatch={dispatch}
            />
            { (isLoading && !isDone) && (
              <DemoSetup
                state={state}
                dispatch={dispatch}
              />
            )}
          </div>
        </Feature.Section>
      </Feature.Content>
      <Feature.Footer>
        <Link
          className="demo__auth-link"
          to={urls.home({})}
        >
          {t(`${PREFIX}.auth`)}
        </Link>
      </Feature.Footer>
    </Feature>
  );
}
