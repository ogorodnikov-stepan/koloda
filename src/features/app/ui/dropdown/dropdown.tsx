import { useReducer, useRef, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useClickAway } from 'react-use';
import { BasicProps } from 'features/app/app-types';
import Button from 'features/app/ui/form/button';
import './dropdown.scss';
import clsx from 'clsx';

interface Props extends BasicProps {
  className?: string;
  hasOverlay?: boolean;
  link: ReactNode;
}

export default function Dropdown({ className, hasOverlay, link, children }: Props) {
  const location = useLocation();
  const [isOpen, handleClick] = useReducer((s) => (!s), false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    if (isOpen) handleClick();
  });

  useEffect(() => {
    if (isOpen) handleClick();
  }, [location.pathname]);

  return (
    <div className={clsx(className, 'dropdown')} ref={ref}>
      { hasOverlay && (
        <div
          className={clsx(className && `${className}__overlay`, 'dropdown__overlay')}
          data-is-open={isOpen}
          onClick={handleClick}
          aria-hidden="true"
        />
      )}
      <Button
        className={clsx(className && `${className}__toggle`, 'dropdown__toggle')}
        data-is-open={isOpen}
        onClick={handleClick}
      >
        { link && (
          <span className={clsx(className && `${className}__toggle-value`, 'dropdown__toggle-value')}>
            {link}
          </span>
        )}
      </Button>
      <div
        className={clsx(className && `${className}__content`, 'dropdown__content')}
        data-is-open={isOpen}
      >
        {children}
      </div>
    </div>
  );
}
