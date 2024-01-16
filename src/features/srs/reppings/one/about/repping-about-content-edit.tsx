import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore, isDemoSelector } from 'features/app/app-store';
import urls from 'features/app/routing/urls';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/reppings/one/repping-reducer';
import { useDeleteReppingMutation } from 'features/srs/reppings/reppings-queries';
import Editor from 'features/app/ui/editor/editor';
import TextInput from 'features/app/ui/form/text-input';
import DeleteDialog from 'features/app/ui/modal/delete-dialog/delete-dialog';

const PREFIX = 'srs:reppings.one.about';
const OPERATION = 'repping_update';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function ReppingAboutContentEdit({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const isDemo = useStore(isDemoSelector);
  const mutation = useDeleteReppingMutation({ isDemo });
  const { data, error } = state.repping;

  const handleChange = useCallback(({ target: { name, value } }) => {
    dispatch(['reppingUpdated', { property: name, value }]);
  }, []);

  return (
    <>
      <TextInput
        className="repping-about__title"
        name="title"
        label={t(`${PREFIX}.properties.title.label`)}
        isError={!!error?.meta?.errors?.[OPERATION].title}
        errors={error?.meta?.errors?.[OPERATION].title}
        errorPrefix={`${PREFIX}.properties.title.errors`}
        value={data?.title || ''}
        onChange={handleChange}
      />
      <Editor
        className="repping-about__description"
        name="description"
        label={t(`${PREFIX}.properties.description.label`)}
        placeholder={t(`${PREFIX}.properties.description.placeholder`)}
        autoFocus={false}
        value={data?.description}
        onChange={handleChange}
      />
      <DeleteDialog
        params={{ id: data?.id }}
        mutation={mutation}
        url={urls.reppings({ isDemo })}
        prefix={`${PREFIX}.delete`}
      />
    </>
  );
}
