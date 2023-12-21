import { useTranslation } from 'react-i18next';
import urls from 'features/app/routing/urls';
import { isDemoSelector, useStore } from 'features/app/app-store';
import { Divel, Repping } from 'features/srs/srs-types';
import Many from 'features/app/ui/feature/many/many';

const PREFIX = 'srs:reppings.many.list';

interface Props {
  repping: Repping;
}

export default function ReppingsItem({ repping }: Props) {
  const { t } = useTranslation();
  const isDemo = useStore(isDemoSelector);

  return (
    <Many.ListItemLink
      entity="reppings"
      to={urls.repping({ isDemo, id: repping.id })}
    >
      <span className="reppings__item-title">
        {repping.title}
      </span>
      { repping.divels.length > 0 ? (
        <ul className="reppings__item-divels">
          { repping.divels.map((divel: Divel) => (
            <li
              key={divel.id}
              className="reppings__item-divel"
            >
              {divel.title}
            </li>
          ))}
        </ul>
      ) : (
        <span className="reppings__item-no-divels">
          {t(`${PREFIX}.noDivels`)}
        </span>
      )}
    </Many.ListItemLink>
  );
}
