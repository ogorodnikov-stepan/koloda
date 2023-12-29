import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isDemoSelector, useStore } from 'features/app/app-store';
import { State } from 'features/srs/lessons/lesson/lesson-reducer';
import { useLessonResultsMutation } from 'features/srs/lessons/lessons-queries';

const PREFIX = 'srs:lessons.status.done';

interface Props {
  state: State;
}

export default function LessonStatusDone({ state }: Props) {
  const { t } = useTranslation();
  const isDemo = useStore(isDemoSelector);
  const { mutate, status } = useLessonResultsMutation({ isDemo });
  const { results } = state;

  useEffect(() => {
    mutate({ data: results });
  }, []);

  return (
    <div
      className="lesson__status"
      data-status="done"
    >
      <h2 className="lesson__done-title">
        {t(`${PREFIX}.title`)}
      </h2>
      <div
        className="lesson__results-upload-status"
        data-status={status}
      >
        {t(`${PREFIX}.status.${status}`)}
      </div>
    </div>
  );
}
