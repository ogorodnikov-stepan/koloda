import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import Many from 'features/app/ui/feature/many/many';
import SubjectSelect from 'features/srs/decks/selects/subject-select';
import LanguageSelect from 'features/srs/decks/selects/language-select';
import Checkbox from 'features/app/ui/form/checkbox';
import { State, DECKS_SORT_OPTIONS, DECKS_FILTERS } from './decks-reducer';

const PREFIX = 'srs:decks.many.options';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DecksOptions({ state, dispatch }: Props) {
  const { t } = useTranslation();
  const { meta, params, ui } = state;

  const getSortValue = useCallback((item) => (
    t(`${PREFIX}.sorting.${item}`)
  ), []);

  const handleSortChange = useCallback(({ target: { value } }) => {
    dispatch(['sortUpdated', value]);
  }, []);

  const handleSelectChange = useCallback(({ target: { name, value } }) => {
    dispatch(['filterUpdated', { name, value }]);
  }, []);

  const handleFilterChange = useCallback(({ target: { name, checked } }) => {
    dispatch(['filterUpdated', { name, checked }]);
  }, []);

  const handleFiltersClear = useCallback(() => {
    dispatch(['filtersCleared', {}]);
  }, []);

  return (
    <Many.Options>
      <Many.Options.Sorting
        items={DECKS_SORT_OPTIONS}
        item={params.sort}
        getValue={getSortValue}
        onChange={handleSortChange}
      />
      <Many.Options.Filters
        isEmpty={meta.areFiltersEmpty}
        onClear={handleFiltersClear}
      >
        <SubjectSelect
          categoryClassName="decks__category"
          subjectClassName="decks__subject"
          hasNullOption
          categoryId={params.filters?.categoryId?.[0]}
          subjectId={params.filters?.subjectId?.[0]}
          onCategoryChange={handleSelectChange}
          onSubjectChange={handleSelectChange}
        />
        <LanguageSelect
          className="decks__language"
          hasNullOption
          value={params.filters?.languageId?.[0]}
          onChange={handleSelectChange}
        />
        { DECKS_FILTERS.map((filter) => (
          <Many.Options.Filter
            key={filter.name}
            title={t(`${PREFIX}.filters.${filter.name}.title`)}
          >
            { filter.values.map((value) => (
              <Checkbox
                key={`${filter.name}__${value}`}
                label={t(`${PREFIX}.filters.${filter.name}.${value}`)}
                name={`${filter.name}__${value}`}
                id={`${filter.name}__${value}`}
                checked={ui.filters?.[`${filter.name}__${value}`] === true}
                onChange={handleFilterChange}
              />
            ))}
          </Many.Options.Filter>
        ))}
      </Many.Options.Filters>
    </Many.Options>
  );
}
