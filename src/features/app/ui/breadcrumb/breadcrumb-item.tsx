import clsx from 'clsx';
import { Link } from 'react-router-dom';
import './breadcrumb.scss';

export interface Crumb {
  id: string;
  title: string;
  url?: string;
  menu?: Crumb[];
  active?: boolean;
}

interface Props {
  crumb: Crumb;
}

export default function BreadcrumbItem({ crumb: { title, url, menu, active } }: Props) {
  return (
    <li className={clsx({ active, menu: !!menu })}>
      { url && (
        <Link to={url}>
          {title}
        </Link>
      )}
      { active && (
        <span>{title}</span>
      )}
      { menu && (
        <ul>
          { menu.map((crumb) => (
            <BreadcrumbItem
              key={crumb.id}
              crumb={crumb}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
