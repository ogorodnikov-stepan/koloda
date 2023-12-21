import clsx from 'clsx';
import { ReducerEntityStatus, ReducerDispatch } from 'features/app/reducer/reducer-types';
import EditbarClick from './editbar-click';
import EditbarDelay from './editbar-delay';
import './editbar.scss';

export type EditbarVariant = 'click' | 'delay';
export type EditbarMode = 'view' | 'edit';

interface Props {
  className: string;
  entity: string;
  status: ReducerEntityStatus;
  dispatch: ReducerDispatch;
}

export default function Editbar(
  { className, entity, status, dispatch }: Props,
) {
  if (!status.isLoaded) return null;

  return (
    <div
      className={clsx(`${className}__editbar`, 'editbar')}
      data-variant={status.editbar.variant}
    >
      { (status.editbar.variant === 'click') && (
        <EditbarClick
          className={className}
          entity={entity}
          status={status}
          dispatch={dispatch}
        />
      )}
      { (status.editbar.variant === 'delay') && (
        <EditbarDelay
          className={className}
          entity={entity}
          status={status}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}
