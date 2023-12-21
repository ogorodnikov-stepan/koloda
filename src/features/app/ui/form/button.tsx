import clsx from 'clsx';
import './button.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content?: React.ReactNode;
}

export default function Button({ className, type, content, children, ...props }: Props) {
  return (
    <button
      className={clsx(className, 'button')}
      type={type || 'button'}
      {...props}
    >
      {content ?? children}
    </button>
  );
}
