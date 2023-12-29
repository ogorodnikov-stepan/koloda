import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import Feature from 'features/app/ui/feature/feature';
import Editbar from 'features/app/ui/editbar/editbar';
import AccountHandlers from './account-handlers';
import AccountContentView from './account-content-view';
import AccountContentEdit from './account-content-edit';
import { State } from './account-reducer';

const PREFIX = 'auth:account';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function AccountContent({ state, dispatch }: Props) {
  const { t } = useTranslation();
  const { status } = state.user;
  const { mode } = status.editbar;

  return (
    <Feature.Section
      className="account"
      mode={mode}
    >
      <Feature.SectionHeader
        className="account__header"
        title={t(`${PREFIX}.title`)}
      >
        <Editbar
          className="account"
          entity="user"
          status={status}
          dispatch={dispatch}
        />
      </Feature.SectionHeader>
      <Feature.SectionContent className="account__content">
        { mode === 'view' && (
          <AccountContentView
            state={state}
          />
        )}
        { mode === 'edit' && (
          <>
            <AccountHandlers
              state={state}
              dispatch={dispatch}
            />
            <AccountContentEdit
              state={state}
              dispatch={dispatch}
            />
          </>
        )}
      </Feature.SectionContent>
    </Feature.Section>
  );
}
