import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';

interface Props extends BasicProps {
  className?: string;
}

function TutorialModalTitle({ className, children }: Props) {
  return (
    <h2 className={clsx(className, 'tutorial-modal__title')}>
      {children}
    </h2>
  );
}

export default TutorialModalTitle;
