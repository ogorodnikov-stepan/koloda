import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useClickAway, useKey } from 'react-use';
import { BasicProps } from 'features/app/app-types';
import './modal.scss';

interface Props extends BasicProps {
  close?: () => void;
}

export default function Modal({ close, children }: Props) {
  const ref = useRef(null);

  useClickAway(ref, () => { if (close) close(); });
  useKey('Escape', close);

  return ReactDOM.createPortal(
    <div
      className="app-modal__overlay"
    >
      <div
        className="app-modal__content"
        ref={ref}
      >
        {children}
      </div>
    </div>,
    document.getElementById('app-modal')!,
  );
}
