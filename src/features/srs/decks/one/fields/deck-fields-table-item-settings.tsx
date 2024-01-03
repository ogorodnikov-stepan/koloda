import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import { Field } from 'features/srs/srs-types';
import Dropdown from 'features/app/ui/dropdown/dropdown';
import Checkbox from 'features/app/ui/form/checkbox';
import { typeTestProcessings } from 'features/srs/lessons/lesson/action-types/lesson-action-typetest-domain';

const PREFIX = 'srs:decks.one.fields.settings';

interface Props {
  index: number;
  field: Field;
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckFieldsTableItemSettings({ index, field, state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { status: { editbar: { mode } } } = state.fields;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { name, checked } }) => {
    dispatch(['fieldSettingUpdated', { index, path: name, value: checked }]);
  };

  return (
    <td
      className="deck-fields__table-cell"
      data-cell-type="body"
      data-cell-column="settings"
    >
      <Dropdown
        className="deck-fields__field-settings"
        link=""
      >
        <ul className="deck-fields__field-settings__actions">
          <li className="deck-fields__field-settings__actions-item">
            <h4 className="deck-fields__field-settings__title">
              {t(`${PREFIX}.actions.show`)}
            </h4>
            <Checkbox
              className="deck-fields__field-settings__item"
              id={`field-settings-${field.id}-show-is-label-visible`}
              name="settings.actions.show.isLabelVisible"
              label={t(`${PREFIX}.values.isLabelVisible`)}
              disabled={mode === 'view'}
              checked={field?.settings?.actions?.show?.isLabelVisible}
              onChange={onChange}
            />
          </li>
          <li className="deck-fields__field-settings__actions-item">
            <h4 className="deck-fields__field-settings__title">
              {t(`${PREFIX}.actions.typeTest`)}
            </h4>
            <Checkbox
              className="deck-fields__field-settings__item"
              id={`field-settings-${field.id}-typeTest-is-label-visible`}
              name="settings.actions.typeTest.isLabelVisible"
              label={t(`${PREFIX}.values.isLabelVisible`)}
              disabled={mode === 'view'}
              checked={field?.settings?.actions?.typeTest?.isLabelVisible}
              onChange={onChange}
            />
            { Object.keys(typeTestProcessings).map((item) => (
              <Checkbox
                key={item}
                className="deck-fields__field-settings__item"
                id={`field-settings-${field.id}-typeTest-${item}`}
                name={`settings.actions.typeTest.processings.${item}`}
                label={t(`${PREFIX}.values.${item}`)}
                disabled={mode === 'view'}
                checked={field?.settings?.actions?.typeTest?.processings?.[item]}
                onChange={onChange}
              />
            ))}
          </li>
        </ul>
      </Dropdown>
    </td>
  );
}
