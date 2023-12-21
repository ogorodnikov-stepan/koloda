import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/reppings/one/repping-reducer';
import Feature from 'features/app/ui/feature/feature';
import ReppingAboutContentView from './repping-about-content-view';
import ReppingAboutContentEdit from './repping-about-content-edit';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function ReppingAboutContent({ state, dispatch }: Props) {
  const { status: { editbar: { mode } } } = state.repping;

  return (
    <Feature.SectionContent className="repping-about__content">
      { mode === 'view' && (
        <ReppingAboutContentView
          state={state}
          dispatch={dispatch}
        />
      )}
      { mode === 'edit' && (
        <ReppingAboutContentEdit
          state={state}
          dispatch={dispatch}
        />
      )}
    </Feature.SectionContent>
  );
}
