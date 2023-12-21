import { useState, useCallback } from 'react';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/lessons/lesson/lesson-reducer';
import { useKey } from 'react-use';
import Button from 'features/app/ui/form/button';
import { int } from 'features/app/misc/misc';

const ALLOWED_HOTKEYS: Record<string, number> = {
  Digit1: 0,
  Digit2: 1,
  Digit3: 2,
  Digit4: 3,
  Digit5: 4,
  Digit6: 5,
  Digit7: 6,
  Digit8: 7,
  Digit9: 8,
  Digit0: 9,
};

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function LessonActionDivels({ state, dispatch }: Props) {
  const { divels } = state.current.repping!;
  const { divelIndex, isInitial } = state.current.action!;

  const areHotkeysEnabled = useState(isInitial);

  const handleClick = useCallback(({ currentTarget: { name } }) => {
    dispatch(['divelSet', { index: int(name) }]);
  }, []);

  const keyPredicate = useCallback(({ code }: KeyboardEvent) => (
    areHotkeysEnabled && ALLOWED_HOTKEYS[code] !== undefined
  ), [areHotkeysEnabled]);

  const keyHandler = useCallback(({ code }: KeyboardEvent) => {
    const key = ALLOWED_HOTKEYS[code];
    if (divels[key] !== undefined && key !== divelIndex) dispatch(['divelSet', { index: key }]);
  }, [divels, divelIndex]);

  useKey(keyPredicate, keyHandler);

  return (
    <ul className="lesson__divels">
      { divels.map((divel, index) => (
        <li
          key={divel.id}
          className="lesson__divels-item"
        >
          <Button
            className="lesson__divels-item-button"
            name={`${index}`}
            data-is-selected={index === divelIndex}
            onClick={handleClick}
          >
            { areHotkeysEnabled && (
              <span
                className="lesson__divels-item-number"
              >
                {index + 1}
              </span>
            )}
            <span
              className="lesson__divels-item-title"
            >
              {divel.title}
            </span>
          </Button>
        </li>
      ))}
    </ul>
  );
}
