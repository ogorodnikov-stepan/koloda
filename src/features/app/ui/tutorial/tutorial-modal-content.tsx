import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';

interface Props extends BasicProps {
  className?: string;
}

function TutorialModalContent({ className, children }: Props) {
  return (
    <div className={clsx(className, 'tutorial-modal__content')}>
      {children}
    </div>
  );
}

export default TutorialModalContent;
