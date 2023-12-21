import { useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageProps } from 'features/app/app-types';
import titles from 'features/app/routing/titles';
import { useLessonQuery, useLessonDeckQuery, useLessonReppingQuery } from 'features/srs/lessons/lessons-queries';
import { lessonReducer, lessonDefault } from 'features/srs/lessons/lesson/lesson-reducer';
import LessonLayout from './layout/lesson-layout';
import './lesson.scss';

interface Props extends PageProps {
  type: string;
  params: Record<string, string>;
}

export default function Lesson({ type, params, isDemo }: Props) {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(lessonReducer, lessonDefault);
  const { queue: { deck, repping } } = state;
  const planQuery = useLessonQuery({ ...params, type }, { isDemo });
  const deckQuery = useLessonDeckQuery({ limit: params.limit, type, id: deck }, { isDemo });
  const reppingQuery = useLessonReppingQuery({ id: repping }, { isDemo });

  useEffect(() => {
    document.title = titles.lesson(t, { isDemo });
  }, [t, isDemo]);

  useEffect(() => {
    if (planQuery.data) dispatch(['planReceived', planQuery.data]);
  }, [planQuery.data]);

  useEffect(() => {
    if (deckQuery.data) dispatch(['deckReceived', deckQuery.data]);
  }, [deckQuery.data]);

  useEffect(() => {
    if (reppingQuery.data) dispatch(['reppingReceived', reppingQuery.data]);
  }, [reppingQuery.data]);

  return (
    <LessonLayout
      state={state}
      dispatch={dispatch}
    />
  );
}
