import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { EditbarMode } from 'features/app/ui/editbar/editbar';
import { Phase } from 'features/srs/srs-types';
import TextInput from 'features/app/ui/form/text-input';
import Button from 'features/app/ui/form/button';

const PREFIX = 'srs:phases.one';

interface Props {
  mode: EditbarMode;
  phaseIndex: number;
  phase: Phase;
  dispatch: ReducerDispatch;
}

export default function PhasesListItemHeader({ mode, phaseIndex, phase, dispatch }: Props) {
  const { t } = useTranslation('srs');

  const handleTitleChange = useCallback((event) => {
    dispatch(['titleUpdated', { phaseIndex, title: event.target.value }]);
  }, [phaseIndex]);

  const handleDeleteClick = useCallback(() => {
    dispatch(['phaseDeleted', { phaseIndex }]);
  }, [phaseIndex]);

  return (
    <div className="phase__header">
      <span className="phase__index">
        {phaseIndex + 1}
      </span>
      { mode === 'view' ? (
        <span
          className="phase__title"
          data-readonly
          data-is-placeholder={!phase.title}
        >
          {phase.title || t(`${PREFIX}.title.placeholder`)}
        </span>
      ) : (
        <TextInput
          className="phase__title"
          placeholder={t(`${PREFIX}.title.placeholder`)}
          value={phase.title || ''}
          onChange={handleTitleChange}
          disabled={mode !== 'edit'}
        />
      )}
      { (mode === 'edit') && (
        <Button
          className="phase__delete delete-inline-button"
          onClick={handleDeleteClick}
        />
      )}
    </div>
  );
}
