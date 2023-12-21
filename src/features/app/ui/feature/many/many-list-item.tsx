import { BasicProps } from 'features/app/app-types';

export default function ManyListItem({ children }: BasicProps) {
  return (
    <li className="many__list-item">
      {children}
    </li>
  );
}
