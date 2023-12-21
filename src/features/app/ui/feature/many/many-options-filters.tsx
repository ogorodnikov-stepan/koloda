import { useTranslation } from 'react-i18next';
import { BasicProps } from 'features/app/app-types';
import Button from 'features/app/ui/form/button';

const PREFIX = 'app:ui.feature.many.options.filters';

interface Props extends BasicProps {
  isEmpty?: boolean;
  onClear: () => void;
}

export default function ManyOptionsFilters({ isEmpty, onClear, children }: Props) {
  const { t } = useTranslation();

  return (
    <div className="many__filters">
      <div className="many__filters-header">
        <span className="many__filters-title">
          {t(`${PREFIX}.title`)}
        </span>
        { (isEmpty === false) && (
          <Button
            className="many__filters-clear"
            disabled={isEmpty}
            onClick={onClear}
            content={t(`${PREFIX}.clear`)}
          />
        )}
      </div>
      <div className="many__filters-content">
        {children}
      </div>
    </div>
  );
}
