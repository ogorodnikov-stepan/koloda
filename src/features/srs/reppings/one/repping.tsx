import { useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageProps } from 'features/app/app-types';
import titles from 'features/app/routing/titles';
import { useReppingQuery } from 'features/srs/reppings/reppings-queries';
import { Repping } from 'features/srs/srs-types';
import Error404 from 'features/app/pages/error/error-404';
import { Tabs, TabsHeader, TabHeader, TabContent } from 'features/app/ui/tabs/tabs';
import Feature from 'features/app/ui/feature/feature';
import { reppingReducer, reppingDefault } from './repping-reducer';
import ReppingExport from './repping-export';
import ReppingAbout from './about/repping-about';
import ReppingDivels from './divels/repping-divels';

const PREFIX = 'srs:reppings.one.tabs';

interface Props extends PageProps {
  id: Repping['id'];
}

export default function OneRepping({ id, isDemo }: Props) {
  const { t } = useTranslation();
  const { isLoading, data, error } = useReppingQuery({ id }, { isDemo });
  const [state, dispatch] = useReducer(reppingReducer, reppingDefault);
  const { title } = state.meta;

  useEffect(() => { dispatch(['isDemoSet', isDemo]); }, [isDemo]);

  useEffect(() => {
    document.title = titles.repping(t, { isDemo, repping: title });
  }, [t, isDemo, title]);

  useEffect(() => {
    if (data) dispatch(['dataReceived', data]);
  }, [data]);

  if ((error?.name === 'ValidationError') || (error?.status === 404)) {
    return <Error404 />;
  }

  return (
    <Feature entity="repping">
      <Tabs className="feature__tabs">
        <Feature.Header>
          <Feature.Title isLoading={isLoading}>
            {title}
          </Feature.Title>
          { process.env.NODE_ENV === 'development' && isDemo && (
            <ReppingExport id={id} />
          )}
          <TabsHeader className="feature__tabs-header">
            { state.meta.tabs.headers.map((tab: string) => (
              <TabHeader
                key={tab}
                disabled={state.meta.tabs.items[tab].disabled}
              >
                {t(`${PREFIX}.${tab}`)}
              </TabHeader>
            ))}
          </TabsHeader>
        </Feature.Header>
        <Feature.Content>
          <TabContent className="feature__tab-content">
            <ReppingAbout
              state={state}
              dispatch={dispatch}
            />
          </TabContent>
          <TabContent className="feature__tab-content">
            <ReppingDivels
              state={state}
              dispatch={dispatch}
            />
          </TabContent>
        </Feature.Content>
      </Tabs>
    </Feature>
  );
}
