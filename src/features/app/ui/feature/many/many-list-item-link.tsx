import { Link, LinkProps } from 'react-router-dom';
import { BasicProps } from 'features/app/app-types';

interface Props extends BasicProps {
  to: LinkProps['to'];
  entity: string;
}

export default function ManyListItemLink({ to, entity, children }: Props) {
  return (
    <Link
      className="many__list-item-link"
      data-entity={entity}
      to={to}
    >
      <div
        className="many__list-item-link-content"
        data-entity={entity}
      >
        {children}
      </div>
    </Link>
  );
}
