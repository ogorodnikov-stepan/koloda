import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';
import './content-block.scss';

interface Props extends BasicProps {
  className?: string;
}

export default function ContentBlock(props: Props) {
  return (
    <div
      className={clsx('content-block', props.className)}
    >
      {props.children}
    </div>
  );
}
