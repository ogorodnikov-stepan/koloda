import { Link } from 'react-router-dom';
import { LessonType } from 'features/srs/srs-types';
import './lesson-badge.scss';

interface Props {
  amount: number;
  type: LessonType;
  link: string;
}

export default function LessonBadge({ amount, type, link }: Props) {
  return (amount > 0) ? (
    <Link
      className="lesson__badge"
      to={link}
      data-lesson-type={type}
      data-is-active="true"
    >
      {amount}
    </Link>
  ) : (
    <span
      className="lesson__badge"
      data-lesson-type={type}
      data-is-active="false"
    >
      {amount}
    </span>
  );
}
