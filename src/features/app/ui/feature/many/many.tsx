import { BasicProps } from 'features/app/app-types';
import ManyContent from './many-content';
import ManyOptions from './many-options';
import ManyEmpty from './many-empty';
import ManyList from './many-list';
import ManyListItem from './many-list-item';
import ManyListItemLink from './many-list-item-link';

import './many.scss';

interface ManyProps extends BasicProps {
  entity?: string;
}

function Many({ entity, children }: ManyProps) {
  return (
    <div
      className="many"
      data-entity={entity}
    >
      {children}
    </div>
  );
}

Many.Content = ManyContent;
Many.Options = ManyOptions;
Many.Empty = ManyEmpty;
Many.List = ManyList;
Many.ListItem = ManyListItem;
Many.ListItemLink = ManyListItemLink;

export default Many;
