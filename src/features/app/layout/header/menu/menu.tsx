import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, NavLink } from 'react-router-dom';
import { MenuItem } from 'features/app/layout/layout-types';
import Button from 'features/app/ui/form/button';
import Dropdown from 'features/app/ui/dropdown/dropdown';
import './menu.scss';

type Props = {
  name: string;
  items?: Array<MenuItem>;
};

export default function Menu({ name, items }: Props) {
  const { t } = useTranslation('app');
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => { setIsOpen((s) => !s); }, []);

  useEffect(() => { if (isOpen) handleClick(); }, [pathname]);

  if (!items?.length) return null;

  return (
    <nav
      className={`${name} menu`}
      data-menu-name={name}
    >
      <div
        className={`${name}__overlay menu__overlay`}
        data-is-open={isOpen}
        onClick={handleClick}
        aria-hidden="true"
      />
      <Button
        className={`${name}__toggle menu__toggle`}
        data-is-open={isOpen}
        onClick={handleClick}
        content=""
      />
      <ul
        className={`${name}__items menu__items`}
        data-is-open={isOpen}
      >
        { items.map((item) => (
          <li
            key={item.t}
            className={`${name}__item menu__item`}
          >
            { item.url && (
              <NavLink
                className={`${name}__item-link menu__item-link`}
                to={item.url}
                activeClassName="active"
                exact
              >
                {t(item.t)}
              </NavLink>
            )}
            { item.dropdown && (
              <Dropdown link={t(item.t)}>
                <item.dropdown />
              </Dropdown>
            )}
            { item.component && (
              <item.component />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
