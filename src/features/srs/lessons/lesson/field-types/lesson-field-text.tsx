import { Props } from 'features/srs/lessons/lesson/lesson-action-field';
import TextInput from 'features/app/ui/form/text-input';
import { t } from 'i18next';

const PREFIX = 'srs:lessons.fieldTypes.text';

export default function LessonFieldText(
  { type, field, value, readonly, isError, onChange }: Props,
) {
  const label = field?.settings?.actions?.[type]?.isLabelVisible && field.title;

  return (
    <li className="lesson__fields-item">
      { (readonly || isError) ? (
        <div className="lesson__field">
          { label && (
            <span className="lesson__field-label">
              {label}
            </span>
          )}
          <span
            className="lesson__field-value"
            data-is-empty={!(isError ? value : field.content?.text)}
            data-is-incorrect={isError}
          >
            {(isError ? value : field.content?.text) || t(`${PREFIX}.empty`)}
          </span>
        </div>
      ) : (
        <TextInput
          className="lesson__field"
          label={label}
          name={`${field.id}`}
          value={value}
          placeholder={isError ? field.content.text : ''}
          readOnly={readonly}
          autoFocus={field.isFocused}
          data-is-correct={field.isCorrect === true}
          onChange={onChange}
        />
      )}
      { isError && (
        <div className="lesson__field">
          <span
            className="lesson__field-value"
            data-is-empty={!field.content?.text}
            data-is-correct="true"
          >
            {field.content?.text || t(`${PREFIX}.empty`)}
          </span>
        </div>
      )}
    </li>
  );
}
