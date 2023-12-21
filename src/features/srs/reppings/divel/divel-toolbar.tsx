import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import Feature from 'features/app/ui/feature/feature';
import Editbar from 'features/app/ui/editbar/editbar';
import { State } from './divel-reducer';

const PREFIX = 'srs:phases.many';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DivelToolbar({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { data, status } = state.phases;
  const length = data?.length ?? 0;

  return (
    <Feature.Toolbar>
      { status.isLoaded && (
        <span className="phases__amount feature__toolbar-amount">
          <span className="phases__amount-value feature__toolbar-amount-value">
            {length}
          </span>
          <span className="phases__amount-caption feature__toolbar-amount-caption">
            {t(`${PREFIX}.amount`, { count: length })}
          </span>
        </span>
      )}
      <Editbar
        className="phases"
        entity="phases"
        status={status}
        dispatch={dispatch}
      />
    </Feature.Toolbar>
  );
}
