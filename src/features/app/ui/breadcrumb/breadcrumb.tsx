import clsx from 'clsx';
import BreadcrumbItem, { Crumb } from './breadcrumb-item';
import './breadcrumb.scss';

export type Crumbs = Crumb[];

interface Props {
  className?: string;
  crumbs: Crumbs;
}

export default function Breadcrumb({ className, crumbs }: Props) {
  if (crumbs.length === 0) return null;

  return (
    <nav
      className={clsx(className, 'breadcrumb')}
      aria-label="Breadcrumb"
    >
      <ul>
        {crumbs.map((crumb) => (
          <BreadcrumbItem
            key={crumb.id}
            crumb={crumb}
          />
        ))}
      </ul>
    </nav>
  );
}
