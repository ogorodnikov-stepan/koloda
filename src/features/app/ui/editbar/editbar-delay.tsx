import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerEntityStatus, ReducerDispatch } from 'features/app/reducer/reducer-types';
import Button from 'features/app/ui/form/button';
import { getMode, isModeButtonDisabled } from './editbar-utility';
import EditbarMessage from './editbar-message';
import './editbar.scss';

const PREFIX_DEFAULT = 'app:ui:feature.section.header.button.';

interface Props {
  className: string;
  entity: string;
  status: ReducerEntityStatus;
  dispatch: ReducerDispatch;
}

export default function EditbarDelay(
  { className, entity, status, dispatch }: Props,
) {
  const { t } = useTranslation();

  const setMode = useCallback(({ target: { name } }) => {
    dispatch(['editbarModeSet', { entity, mode: name }]);
  }, [entity]);

  return (
    <>
      <EditbarMessage
        className={className}
        status={status}
      />
      <Button
        name={getMode(status)}
        className="editbar__button"
        data-mode={getMode(status)}
        disabled={isModeButtonDisabled(status)}
        onClick={setMode}
        content={t(PREFIX_DEFAULT + getMode(status))}
      />
    </>
  );
}
