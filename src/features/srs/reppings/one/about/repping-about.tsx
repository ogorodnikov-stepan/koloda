import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/reppings/one/repping-reducer';
import Feature from 'features/app/ui/feature/feature';
import Editbar from 'features/app/ui/editbar/editbar';
import ReppingAboutHandlers from './repping-about-handlers';
import ReppingAboutContent from './repping-about-content';
import ReppingAboutSkeleton from './repping-about-skeleton';
import './repping-about.scss';

const PREFIX = 'srs:reppings.one.about';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function ReppingAbout({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { data, status } = state.repping;
  const { mode } = status.editbar;

  return (
    <Feature.Section
      className="repping-about"
      mode={mode}
    >
      <Feature.SectionHeader
        className="repping-about__header"
        title={t(`${PREFIX}.title`)}
      >
        <Editbar
          className="repping-about"
          entity="repping"
          status={status}
          dispatch={dispatch}
        />
      </Feature.SectionHeader>
      { !data && (
        <ReppingAboutSkeleton />
      )}
      { data && (mode === 'edit') && (
        <ReppingAboutHandlers
          state={state}
          dispatch={dispatch}
        />
      )}
      { data && (
        <ReppingAboutContent
          state={state}
          dispatch={dispatch}
        />
      )}
    </Feature.Section>
  );
}
