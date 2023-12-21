import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/reppings/one/repping-reducer';
import Feature from 'features/app/ui/feature/feature';
import Editbar from 'features/app/ui/editbar/editbar';
import ReppingDivelsSkeleton from './repping-divels-skeleton';
import ReppingDivelsHandlers from './repping-divels-handlers';
import ReppingDivelsList from './repping-divels-list';
import './repping-divels.scss';

const PREFIX = 'srs:divels.many';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function ReppingDivels({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { data, status } = state.divels;
  const { divels } = data || {};
  const { mode } = status.editbar;

  return (
    <Feature.Section
      className="divels"
      mode={mode}
    >
      <Feature.SectionHeader
        className="divels"
        title={t(`${PREFIX}.title`)}
      >
        <Editbar
          className="divels__header"
          entity="divels"
          status={status}
          dispatch={dispatch}
        />
      </Feature.SectionHeader>
      { !divels && (
        <ReppingDivelsSkeleton />
      )}
      { divels && (mode === 'edit') && (
        <ReppingDivelsHandlers
          state={state}
          dispatch={dispatch}
        />
      )}
      { divels && (
        <ReppingDivelsList
          state={state}
          dispatch={dispatch}
        />
      )}
    </Feature.Section>
  );
}
