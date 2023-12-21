import { useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import urls from 'features/app/routing/urls';
import Feature from 'features/app/ui/feature/feature';
import { demoReducer, demoInit } from './demo-reducer';
import DemoForm from './demo-form';
import DemoSetup from './demo-setup';
import './demo.scss';

export default function Demo() {
  const { i18n: { language } } = useTranslation();
  const { push } = useHistory();
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(demoReducer, { language }, demoInit);
  const { meta: { isSubmitted, isDone } } = state;

  useEffect(() => {
    if (isDone) {
      queryClient.resetQueries(['users', 'current']);
      push(urls.home({ isDemo: true }));
    }
  }, [isDone]);

  return (
    <Feature entity="demo">
      <Feature.Content>
        <Feature.Section className="demo">
          <div className="demo__content">
            <DemoForm
              state={state}
              dispatch={dispatch}
            />
            { (isSubmitted && !isDone) && (
              <DemoSetup
                state={state}
                dispatch={dispatch}
              />
            )}
          </div>
        </Feature.Section>
      </Feature.Content>
    </Feature>
  );
}
