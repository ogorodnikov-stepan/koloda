import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import Many from 'features/app/ui/feature/many/many';
import Checkbox from 'features/app/ui/form/checkbox';
import { State, REPPINGS_SORT_OPTIONS, REPPINGS_FILTERS } from './reppings-reducer';

const PREFIX = 'srs:reppings.many.options';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function ReppingsOptions({ state, dispatch }: Props) {
  const { t } = useTranslation();
  const { meta, params, ui } = state;

  const getSortValue = useCallback((item) => (
    t(`${PREFIX}.sorting.${item}`)
  ), []);

  const handleSortChange = useCallback(({ target: { value } }) => {
    dispatch(['sortUpdated', value]);
  }, []);

  const handleFiltersClear = useCallback(() => {
    dispatch(['filtersCleared', {}]);
  }, []);

  const handleFilterChange = useCallback(({ target: { name, checked } }) => {
    dispatch(['filterUpdated', { name, checked }]);
  }, []);

  return (
    <Many.Options>
      <Many.Options.Sorting
        items={REPPINGS_SORT_OPTIONS}
        item={params.sort}
        getValue={getSortValue}
        onChange={handleSortChange}
      />
      <Many.Options.Filters
        isEmpty={meta.areFiltersEmpty}
        onClear={handleFiltersClear}
      >
        { REPPINGS_FILTERS.map((filter) => (
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
