import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useKey } from 'react-use';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/lessons/lesson/lesson-reducer';
import Button from 'features/app/ui/form/button';
import LessonActionField from 'features/srs/lessons/lesson/lesson-action-field';

const PREFIX = 'srs:lessons.actions.show';
const SUBMIT_KEY = 'Enter';

interface Props {
  state: State;
  dispatch: ReducerDispatch
}

export default function LessonActionShow({ state, dispatch }: Props) {
  const { t } = useTranslation();
  const { fields = [] } = state.current.action!;

  const submit = useCallback(() => {
    dispatch(['actionSubmitted', { result: true }]);
  }, []);

  useKey(SUBMIT_KEY, submit);

  return (
    <>
      <div className="lesson__fields">
        { fields.map((field) => (
          <LessonActionField
            key={field.id}
            field={field}
            readonly
          />
        ))}
      </div>
      <Button
        className="lesson__action-submit"
        onClick={submit}
        content={t(`${PREFIX}.submit`)}
      />
    </>
  );
}
