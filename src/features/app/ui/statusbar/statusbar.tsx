import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { ReducerDispatch, ReducerEntityStatus } from 'features/app/reducer/reducer-types';
import Button from 'features/app/ui/form/button';
import './statusbar.scss';

const PREFIX = 'app:ui:statusbar.';
const PREFIX_MESSAGE = 'app:ui:statusbar.message.';

interface Props {
  className?: string;
  message: string;
  prefix?: string;
  discard: ReducerEntityStatus['discard'];
  entity: string;
  dispatch: ReducerDispatch;
}
// DEPRECATION CANDIDATE
export default function StatusBar(
  { className, message, prefix, discard, entity, dispatch }: Props,
) {
  const { t } = useTranslation('app');

  const handleDiscard = useCallback(() => {
    dispatch(['changesDiscarded', { entity }]);
  }, []);

  return (
    <div className={clsx(className, 'status-bar')}>
      { message && (
        <span
          className={clsx(`${className}-message`, 'status-bar__message')}
          data-message-type={message}
        >
          {t((prefix || PREFIX_MESSAGE) + message)}
        </span>
      )}
      { discard.isAvailable && (
        <Button
          className="status-bar__discard"
          onClick={handleDiscard}
          disabled={!discard.isReady}
        >
          <span>{t(`${PREFIX}discard`)}</span>
        </Button>
      )}
    </div>
  );
}
