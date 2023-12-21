import { useReducer, useEffect, useCallback } from 'react';
import { useKey } from 'react-use';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/lessons/lesson/lesson-reducer';
import Button from 'features/app/ui/form/button';
import LessonActionField from 'features/srs/lessons/lesson/lesson-action-field';
import { typeTestReducer, typeTestDefault } from './lesson-action-typetest-reducer';

const PREFIX = 'srs:lessons.actions.typeTest';
const SUBMIT_KEY = 'Enter';
const COMPLETION_FADE_TIME = 500;

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function LessonActionTypeTest({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { action } = state.current;
  const [actionState, actionDispatch] = useReducer(typeTestReducer, typeTestDefault);
  const { meta: { isDone, isSubmited }, result, fields } = actionState;

  useEffect(() => {
    actionDispatch(['actionReset', { fields: action?.fields }]);
  }, [action]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDone) dispatch(['actionSubmitted', { result }]);
    }, COMPLETION_FADE_TIME);
    return () => clearTimeout(timer);
  }, [isDone, result]);

  const handleChange = useCallback(({ target: { name, value } }) => {
    actionDispatch(['fieldChanged', { field: name, value }]);
  }, []);

  const handleSubmit = useCallback(() => {
    actionDispatch(['actionSubmitted', {}]);
  }, []);

  const handleMarkCorrect = useCallback(() => {
    dispatch(['actionSubmitted', { result: true }]);
  }, []);

  const onKeyDown = useCallback(() => { handleSubmit(); }, []);

  useKey(SUBMIT_KEY, onKeyDown);

  return (
    <>
      { !isDone && (
        <>
          <ul className="lesson__fields">
            { fields.map((field) => (
              <LessonActionField
                key={field.id}
                field={field}
                value={field.value}
                readonly={!field.isTested}
                isError={field.isCorrect === false}
                onChange={handleChange}
              />
            ))}
          </ul>
          <div className="lesson__action-controls">
            <Button
              className="lesson__action-submit"
              data-action-type="type-test"
              data-on-click={isSubmited ? 'submit' : 'check'}
              onClick={handleSubmit}
              content={t(`${PREFIX}.${isSubmited ? 'submit' : 'check'}`)}
            />
            { isSubmited && (
              <Button
                className="lesson__action-mark-correct"
                data-action-type="type-test"
                onClick={handleMarkCorrect}
                content={t(`${PREFIX}.markCorrect`)}
              />
            )}
          </div>
        </>
      )}
      { isDone && result && (
        <div className="lesson__action-status">
          <span
            className="lesson__action-status-message"
            data-status="correct"
          >
            {t(`${PREFIX}.correct`)}
          </span>
        </div>
      )}
    </>
  );
}
