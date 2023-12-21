import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/reppings/one/repping-reducer';
import Editor from 'features/app/ui/editor/editor';

const PREFIX = 'srs:reppings.one.about';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function ReppingAboutContentView({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { data } = state.repping;

  const handleChange = useCallback(({ target: { name, value } }) => {
    dispatch(['reppingUpdated', { property: name, value }]);
  }, []);

  return (
    <>
      <div className="repping-about__timestamps timestamps">
        { data?.createdAt && (
          <span className="repping-about__created-at">
            {t(`${PREFIX}.properties.createdAt`, {
              value: new Date(data?.createdAt),
              formatParams: { value: { dateStyle: 'long' } },
            })}
          </span>
        )}
        { data?.updatedAt && (data?.updatedAt !== data?.createdAt) && (
          <span className="repping-about__updated-at">
            {t(`${PREFIX}.properties.updatedAt`, {
              value: new Date(data?.updatedAt),
              formatParams: { value: { dateStyle: 'long' } },
            })}
          </span>
        )}
      </div>
      <div className="repping-about__eligibility eligibility">
        <div
          className="repping-about__is-eligible is-eligible"
          data-is-eligible={!!data?.isEligible}
        >
          <span>{t(`${PREFIX}.properties.isEligible.${!!data?.isEligible}`)}</span>
        </div>
        { data?.requirements && (
          <div className="repping-about__requirements requirements">
            <ul className="repping-about__requirements-list requirements-list">
              <li
                className="repping-about__requirements-list-item requirements-list-item"
                data-is-checked={data.requirements.divels}
              >
                {t(`${PREFIX}.properties.requirements.divels`)}
              </li>
              <li
                className="repping-about__requirements-list-item requirements-list-item"
                data-is-checked={data.requirements.phases}
              >
                {t(`${PREFIX}.properties.requirements.phases`)}
              </li>
            </ul>
          </div>
        )}
      </div>
      <Editor
        className="repping-about__description"
        name="description"
        label={t(`${PREFIX}.properties.description.label`)}
        placeholder={t(`${PREFIX}.properties.description.placeholder`)}
        readOnly
        value={data?.description}
        onChange={handleChange}
      />
    </>
  );
}
