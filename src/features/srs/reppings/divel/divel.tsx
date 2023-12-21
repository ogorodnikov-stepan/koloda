import { useReducer, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageProps } from 'features/app/app-types';
import { useReppingQuery, useDivelQuery } from 'features/srs/reppings/reppings-queries';
import urls from 'features/app/routing/urls';
import titles from 'features/app/routing/titles';
import Feature from 'features/app/ui/feature/feature';
import Breadcrumb from 'features/app/ui/breadcrumb/breadcrumb';
import { divelReducer, divelDefault } from './divel-reducer';
import DivelSkeleton from './divel-skeleton';
import DivelToolbar from './divel-toolbar';
import DivelEdit from './divel-edit';
import PhasesList from './phases/phases-list';
import './divel.scss';

interface Props extends PageProps {
  reppingId: any;
  divelId: any;
}

export default function OneDivel({ reppingId, divelId, isDemo }: Props) {
  const { t } = useTranslation();
  const divelQuery = useDivelQuery({ reppingId, id: divelId }, { isDemo });
  const reppingQuery = useReppingQuery({ id: reppingId }, { isDemo });
  const [state, dispatch] = useReducer(divelReducer, divelDefault);
  const { meta: { repping, divel }, phases: { data, status } } = state;
  const { editbar: { mode } } = status;

  useEffect(() => { dispatch(['isDemoSet', isDemo]); }, [isDemo]);

  useEffect(() => {
    if (divelQuery.data) dispatch(['divelReceived', divelQuery.data]);
  }, [divelQuery.data]);

  useEffect(() => {
    if (reppingQuery.data) dispatch(['reppingReceived', reppingQuery.data]);
  }, [reppingQuery.data]);

  useEffect(() => {
    document.title = titles.divel(t, {
      isDemo,
      repping: repping.title,
      divel: divel.title,
    });
  }, [t, isDemo, repping.title, divel.title]);

  const breadcrumb = useMemo(() => (
    [
      {
        id: 'repping',
        title: repping.title,
        url: urls.repping({ id: reppingId, isDemo }),
        isLoading: !repping.isLoaded,
      },
      {
        id: 'divel',
        title: divel.title,
        active: true,
        isLoading: !divel.isLoaded,
      },
    ]
  ), [
    isDemo,
    reppingId,
    repping.isLoaded,
    divel.isLoaded,
    repping.title,
    divel.title,
  ]);

  return (
    <Feature
      className="phases"
      data-mode={mode}
    >
      <Feature.Header>
        <Breadcrumb
          className="feature__breadcrumb"
          crumbs={breadcrumb}
        />
      </Feature.Header>
      <Feature.Content>
        <DivelToolbar
          state={state}
          dispatch={dispatch}
        />
        { !data && (
          <DivelSkeleton />
        )}
        { (data && mode === 'edit') && (
          <DivelEdit
            reppingId={reppingId}
            divelId={divelId}
            state={state}
            dispatch={dispatch}
          />
        )}
        { data && (
          <PhasesList
            state={state}
            dispatch={dispatch}
          />
        )}
      </Feature.Content>
    </Feature>
  );
}
