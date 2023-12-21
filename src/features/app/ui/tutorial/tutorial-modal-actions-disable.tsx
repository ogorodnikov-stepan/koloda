import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore, isDemoSelector, setTutorialIsOnSelector } from 'features/app/app-store';
import { useCurrentUserQuery, useUpdateUserTutorialMutation } from 'features/auth/auth-queries';
import Button from 'features/app/ui/form/button';

const PREFIX = 'app:ui.tutorial.actions';

export default function TutorialModalActionsDisable() {
  const { t } = useTranslation();
  const isDemo = useStore(isDemoSelector);
  const setTutorialIsOn = useStore(setTutorialIsOnSelector);
  const { data } = useCurrentUserQuery({ isDemo });
  const { mutate } = useUpdateUserTutorialMutation({ isDemo });
  const { uid } = data?.data || {};

  const handleDisableClick = useCallback(() => {
    if (uid) mutate({ uid, tutorial: { isDone: true } });
    setTutorialIsOn(false);
  }, [uid]);

  return (
    <Button
      className="tutorial-modal__disable"
      onClick={handleDisableClick}
      content={t(`${PREFIX}.disable`)}
    />
  );
}
