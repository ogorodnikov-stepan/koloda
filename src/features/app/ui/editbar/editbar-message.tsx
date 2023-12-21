import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { ReducerEntityStatus } from 'features/app/reducer/reducer-types';
import './editbar.scss';

const PREFIX = 'app:ui:statusbar.message.';

interface Props {
  className?: string;
  status: ReducerEntityStatus;
  prefix?: string;
}

export default function EditbarMessage(
  { className, status, prefix }: Props,
) {
  const { t } = useTranslation('app');
  const { message } = status;

  if (!message) return null;

  return (
    <span
      className={clsx(`${className}-message`, 'editbar__message')}
      data-message-type={message}
    >
      {t((prefix || PREFIX) + message)}
    </span>
  );
}
