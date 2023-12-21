import { BasicProps } from 'features/app/app-types';

interface Props extends BasicProps {
  length?: number;
}

export default function ManyList({ length, children }: Props) {
  if (!length) return null;

  return (
    <ul className="many__list">
      {children}
    </ul>
  );
}
