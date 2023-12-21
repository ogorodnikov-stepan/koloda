import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';
import TutorialModalActionsDisable from './tutorial-modal-actions-disable';
import TutorialModalActionsContinue from './tutorial-modal-actions-continue';

interface Props extends BasicProps {
  className?: string;
}

function TutorialModalActions({ className, children }: Props) {
  return (
    <div className={clsx(className, 'tutorial-modal__actions')}>
      {children}
    </div>
  );
}

TutorialModalActions.Disable = TutorialModalActionsDisable;
TutorialModalActions.Continue = TutorialModalActionsContinue;

export default TutorialModalActions;
