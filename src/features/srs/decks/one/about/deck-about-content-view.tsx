import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import Editor from 'features/app/ui/editor/editor';
import SubjectSelect from 'features/srs/decks/selects/subject-select';
import LanguageSelect from 'features/srs/decks/selects/language-select';

const PREFIX = 'srs:decks.one.about';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckAboutContentView({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { data } = state.deck;

  const handleChange = useCallback(({ target: { name, value } }) => {
    dispatch(['deckUpdated', { property: name, value }]);
  }, []);

  return (
    <>
      <div className="deck-about__timestamps timestamps">
        { data?.createdAt && (
          <span className="deck-about__created-at">
            {t(`${PREFIX}.properties.createdAt`, {
              value: new Date(data?.createdAt),
              formatParams: { value: { dateStyle: 'long' } },
            })}
          </span>
        )}
        { data?.updatedAt && (
          <span className="deck-about__updated-at">
            {t(`${PREFIX}.properties.updatedAt`, {
              value: new Date(data?.updatedAt),
              formatParams: { value: { dateStyle: 'long' } },
            })}
          </span>
        )}
      </div>
      <div className="deck-about__eligibility eligibility">
        <div
          className="deck-about__is-eligible is-eligible"
          data-is-eligible={!!data?.isEligible}
        >
          <span>{t(`${PREFIX}.properties.isEligible.${!!data?.isEligible}`)}</span>
        </div>
        { data?.requirements && (
          <div className="deck-about__requirements requirements">
            <ul className="deck-about__requirements-list requirements-list">
              <li
                className="deck-about__requirements-list-item requirements-list-item"
                data-is-checked={data.requirements.fields}
              >
                {t(`${PREFIX}.properties.requirements.fields`)}
              </li>
              <li
                className="deck-about__requirements-list-item requirements-list-item"
                data-is-checked={data.requirements.cards}
              >
                {t(`${PREFIX}.properties.requirements.cards`)}
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="deck-about__taxonomy">
        <SubjectSelect
          categoryClassName="deck-about__category"
          subjectClassName="deck-about__subject"
          readOnly
          categoryId={data?.categoryId}
          subjectId={data?.subjectId}
          onCategoryChange={handleChange}
          onSubjectChange={handleChange}
        />
        <LanguageSelect
          className="deck-about__language"
          readOnly
          value={data?.languageId}
          onChange={handleChange}
        />
      </div>
      <Editor
        className="deck-about__description"
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
