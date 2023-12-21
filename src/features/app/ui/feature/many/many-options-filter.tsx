import { useReducer } from 'react';
import { BasicProps } from 'features/app/app-types';
import Button from 'features/app/ui/form/button';

interface Props extends BasicProps {
  title?: string;
  isOpenByDefault?: boolean;
}

export default function ManyOptionsFilter({ title, isOpenByDefault, children }: Props) {
  const [isOpen, toggle] = useReducer((s) => !s, !!isOpenByDefault);

  return (
    <div className="many__filter">
      <Button
        className="many__filter-toggle"
        data-is-open={isOpen}
        onClick={toggle}
      >
        <span className="many__filter-title">
          {title}
        </span>
      </Button>
      <div
        className="many__filter-content"
        data-is-open={isOpen}
      >
        {children}
      </div>
    </div>
  );
}
