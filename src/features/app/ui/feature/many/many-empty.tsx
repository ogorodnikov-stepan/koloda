import { BasicProps } from 'features/app/app-types';

interface Props extends BasicProps {
  length?: number;
}

export default function ManyEmpty({ length, children }: Props) {
  if (length) return null;

  return (
    <div className="many__empty">
      <span className="many__empty-content">
        {children}
      </span>
    </div>
  );
}
