import { useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { BasicProps } from 'features/app/app-types';
import Button from 'features/app/ui/form/button';
import ManyOptionsSorting from './many-options-sorting';
import ManyOptionsFilters from './many-options-filters';
import ManyOptionsFilter from './many-options-filter';

const PREFIX = 'app:ui.feature.many.options';

function ManyOptions({ children }: BasicProps) {
  const { t } = useTranslation();
  const [isOpen, toggle] = useReducer((s) => !s, false);

  return (
    <div className="many__options">
      <Button
        className="many__options-toggle"
        data-is-open={isOpen}
        onClick={toggle}
        content={t(`${PREFIX}.title`)}
      />
      <div
        className="many__options-content"
        data-is-open={isOpen}
      >
        {children}
      </div>
    </div>
  );
}

ManyOptions.Sorting = ManyOptionsSorting;
ManyOptions.Filters = ManyOptionsFilters;
ManyOptions.Filter = ManyOptionsFilter;

export default ManyOptions;
