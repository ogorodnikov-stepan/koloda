import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerEntityStatus, ReducerDispatch } from 'features/app/reducer/reducer-types';
import Button from 'features/app/ui/form/button';
import { getMode, isSaveButtonDisabled } from './editbar-utility';
import EditbarMessage from './editbar-message';
import './editbar.scss';

const PREFIX = 'app:ui:editbar.click.button.';

interface Props {
  className: string;
  entity: string;
  status: ReducerEntityStatus;
  dispatch: ReducerDispatch;
}

export default function EditbarClick(
  { className, entity, status, dispatch }: Props,
) {
  const { t } = useTranslation();
  const { isSaved, discard } = status;

  const setMode = useCallback(({ target: { name } }) => {
    dispatch(['editbarModeSet', { entity, mode: name }]);
  }, [entity]);

  const handleSave = useCallback(() => {
    dispatch(['savingInitiated', { entity }]);
  }, [entity]);

  const handleDiscard = useCallback(() => {
    dispatch(['changesDiscarded', { entity }]);
  }, [entity]);

  return (
    <>
      <EditbarMessage
        className={className}
        status={status}
      />
      { isSaved ? (
        <Button
          name={getMode(status)}
          className="editbar__button"
          data-mode={getMode(status)}
          data-action="switch"
          onClick={setMode}
          content={t(PREFIX + getMode(status))}
        />
      ) : (
        <Button
          className="editbar__button"
          data-action="save"
          disabled={isSaveButtonDisabled(status)}
          onClick={handleSave}
        >
          {status.message === 'saving' ? t(`${PREFIX}saving`) : t(`${PREFIX}save`)}
        </Button>
      )}
      { (!isSaved && discard.isAvailable) && (
        <Button
          className="editbar__button"
          data-action="discard"
          disabled={!discard.isReady}
          onClick={handleDiscard}
          content={t(`${PREFIX}discard`)}
        />
      )}
    </>
  );
}
