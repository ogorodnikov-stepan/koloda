import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';
import Button from 'features/app/ui/form/button';

interface Props extends BasicProps {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  content?: React.ReactNode;
}

function TutorialModalActionsContinue({ className, onClick, content }: Props) {
  return (
    <Button
      className={clsx(className, 'tutorial-modal__continue')}
      onClick={onClick}
      content={content}
    />
  );
}

export default TutorialModalActionsContinue;
