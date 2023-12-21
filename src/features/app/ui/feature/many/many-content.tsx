import { useTranslation } from 'react-i18next';
import { UseInfiniteQueryResult } from 'react-query';
import { BasicProps } from 'features/app/app-types';
import Button from 'features/app/ui/form/button';

const PREFIX = 'app:ui.feature.many';

interface Props extends BasicProps {
  query: UseInfiniteQueryResult;
}

export default function ManyContent({ query, children }: Props) {
  const { t } = useTranslation();

  return (
    <div className="many__content">
      {children}
      { query.hasNextPage && (
        <Button
          className="many__load"
          onClick={() => query.fetchNextPage()}
          content={t(`${PREFIX}.load`)}
        />
      )}
    </div>
  );
}
