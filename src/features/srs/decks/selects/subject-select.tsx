import { useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { FilterValue } from 'features/app/reducer/reducer-filters';
import Autocomplete from 'features/app/ui/select/autocomplete';
import { useSubjectsQuery } from 'features/srs/decks/decks-queries';
import { subjectsReducer, subjectsInit } from './subjects-reducer';

const PREFIX = 'srs:decks.selects';

interface Props {
  categoryClassName?: string;
  subjectClassName?: string;
  readOnly?: boolean;
  categoryId?: FilterValue;
  subjectId?: FilterValue;
  hasNullOption?: boolean;
  onCategoryChange: (x: FilterValue) => void;
  onSubjectChange: (x: FilterValue) => void;
}

export default function SubjectSelect(
  { readOnly, hasNullOption, categoryId, subjectId,
    onCategoryChange, onSubjectChange, ...props }: Props,
) {
  const { i18n: { language }, t } = useTranslation('srs');
  const { data } = useSubjectsQuery({ language });
  const [state, dispatch] = useReducer(subjectsReducer, { categoryId, subjectId }, subjectsInit);
  const { categories, subjects, category, subject } = state;

  useEffect(() => {
    dispatch(['nullOptionUpdated', {
      category: hasNullOption && t(`${PREFIX}.category.items.none`),
      subject: hasNullOption && t(`${PREFIX}.subject.items.none`),
    }]);
  }, [hasNullOption, t]);

  useEffect(() => { if (data?.data) dispatch(['dataReceived', data?.data]); }, [data?.data]);
  useEffect(() => { dispatch(['categoryChanged', categoryId]); }, [categoryId]);
  useEffect(() => { dispatch(['subjectChanged', subjectId]); }, [subjectId]);

  if (!categories || !subjects) return null;

  return (
    <>
      { categories && (
        <Autocomplete
          className={clsx(props.categoryClassName, 'category-select')}
          name="categoryId"
          label={t(`${PREFIX}.category.label`)}
          readOnly={readOnly}
          items={categories}
          selectedItem={category}
          onChange={onCategoryChange}
        />
      )}
      { subjects && (
        <Autocomplete
          className={clsx(props.subjectClassName, 'subject-select')}
          name="subjectId"
          label={t(`${PREFIX}.subject.label`)}
          readOnly={readOnly}
          items={subjects}
          selectedItem={subject}
          onChange={onSubjectChange}
        />
      )}
    </>
  );
}
