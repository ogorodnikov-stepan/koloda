import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import Many from 'features/app/ui/feature/many/many';
import SubjectSelect from 'features/srs/decks/selects/subject-select';
import LanguageSelect from 'features/srs/decks/selects/language-select';
import { State, LEARNINGS_SORT_OPTIONS } from './learnings-reducer';

const PREFIX = 'srs:learnings.many.options';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DecksOptions({ state, dispatch }: Props) {
  const { t } = useTranslation();
  const { meta, params } = state;

  const getSortValue = useCallback((item) => (
    t(`${PREFIX}.sorting.${item}`)
  ), []);

  const handleSortChange = useCallback(({ target: { value } }) => {
    dispatch(['sortUpdated', value]);
  }, []);

  const handleSelectChange = useCallback(({ target: { name, value } }) => {
    dispatch(['filterUpdated', { name, value }]);
  }, []);

  const handleFiltersClear = useCallback(() => {
    dispatch(['filtersCleared', {}]);
  }, []);

  return (
    <Many.Options>
      <Many.Options.Sorting
        items={LEARNINGS_SORT_OPTIONS}
        item={params.sort}
        getValue={getSortValue}
        onChange={handleSortChange}
      />
      <Many.Options.Filters
        isEmpty={meta.areFiltersEmpty}
        onClear={handleFiltersClear}
      >
        <SubjectSelect
          categoryClassName="learnings__category"
          subjectClassName="learnings__subject"
          hasNullOption
          categoryId={params.filters?.categoryId?.[0]}
          subjectId={params.filters?.subjectId?.[0]}
          onCategoryChange={handleSelectChange}
          onSubjectChange={handleSelectChange}
        />
        <LanguageSelect
          className="learnings__language"
          hasNullOption
          value={params.filters?.languageId?.[0]}
          onChange={handleSelectChange}
        />
      </Many.Options.Filters>
    </Many.Options>
  );
}
