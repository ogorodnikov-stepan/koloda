import clsx from 'clsx';
import { useStore, isTutorialOnSelector } from 'features/app/app-store';
import { BasicProps } from 'features/app/app-types';
import Modal from 'features/app/ui/modal/modal';
import TutorialModalTitle from './tutorial-modal-title';
import TutorialModalContent from './tutorial-modal-content';
import TutorialModalActions from './tutorial-modal-actions';
import './tutorial-modal.scss';

interface Props extends BasicProps {
  className?: string;
}

function TutorialModal({ className, children }: Props) {
  const isOn = useStore(isTutorialOnSelector);

  if (!isOn) return null;

  return (
    <Modal>
      <div className={clsx(className, 'tutorial-modal')}>
        {children}
      </div>
    </Modal>
  );
}

TutorialModal.Title = TutorialModalTitle;
TutorialModal.Content = TutorialModalContent;
TutorialModal.Actions = TutorialModalActions;

export default TutorialModal;
