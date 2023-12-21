import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore, isDemoSelector } from 'features/app/app-store';
import urls from 'features/app/routing/urls';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import { useDeleteDeckMutation } from 'features/srs/decks/decks-queries';
import TextInput from 'features/app/ui/form/text-input';
import Editor from 'features/app/ui/editor/editor';
import SubjectSelect from 'features/srs/decks/selects/subject-select';
import LanguageSelect from 'features/srs/decks/selects/language-select';
import DeleteDialog from 'features/app/ui/modal/delete-dialog/delete-dialog';

const PREFIX = 'srs:decks.one.about';
const OPERATION = 'deck_update';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckAboutContentEdit({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const isDemo = useStore(isDemoSelector);
  const mutation = useDeleteDeckMutation({ isDemo });
  const { data, error } = state.deck;

  const handleChange = useCallback(({ target: { name, value } }) => {
    dispatch(['deckUpdated', { property: name, value }]);
  }, []);

  return (
    <>
      <TextInput
        name="title"
        className="deck-about__title"
        label={t(`${PREFIX}.properties.title.label`)}
        isError={!!error?.meta?.errors?.[OPERATION].title}
        errors={error?.meta?.errors?.[OPERATION].title}
        errorPrefix={`${PREFIX}.properties.title.errors`}
        value={data?.title || ''}
        onChange={handleChange}
      />
      <div className="deck-about__taxonomy">
        <SubjectSelect
          categoryClassName="deck-about__category"
          subjectClassName="deck-about__subject"
          categoryId={data?.categoryId}
          subjectId={data?.subjectId}
          onCategoryChange={handleChange}
          onSubjectChange={handleChange}
        />
        <LanguageSelect
          className="deck-about__language"
          value={data?.languageId}
          onChange={handleChange}
        />
      </div>
      <Editor
        className="deck-about__description"
        name="description"
        label={t(`${PREFIX}.properties.description.label`)}
        placeholder={t(`${PREFIX}.properties.description.placeholder`)}
        value={data?.description}
        onChange={handleChange}
      />
      <DeleteDialog
        params={{ id: data?.id }}
        mutation={mutation}
        url={urls.decks({ isDemo })}
        prefix={`${PREFIX}.delete`}
      />
    </>
  );
}
