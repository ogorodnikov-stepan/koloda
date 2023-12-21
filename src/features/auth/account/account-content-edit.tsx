import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { LESSON_TYPES } from 'features/srs/lessons/lessons-defaults';
import Feature from 'features/app/ui/feature/feature';
import Settings from 'features/app/ui/settings/settings';
import Avatar from 'features/auth/profile/avatar/avatar';
import TextInput from 'features/app/ui/form/text-input';
import NumberInput from 'features/app/ui/form/number-input';
import { State } from './account-reducer';

// const PREFIX = 'auth:account';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function AccountContentEdit({ state, dispatch }: Props) {
  const { t } = useTranslation();
  const { profile, settings: { learning } } = state.user.data!;

  const handleChange = useCallback(({ target: { name, value } }) => {
    dispatch(['propertyUpdated', { path: name, value }]);
  }, []);

  return (
    <>
      <Feature.Subsection className="account-profile">
        <Feature.SubsectionContent className="account-profile__content">
          <div className="account-profile__user">
            <Avatar
              className="account-profile__user-avatar"
              profile={profile}
            />
            <TextInput
              className="account-profile__user-full-name"
              name="profile.fullName"
              value={profile?.fullName || ''}
              onChange={handleChange}
            />
          </div>
        </Feature.SubsectionContent>
      </Feature.Subsection>
      <Feature.Subsection className="account-settings">
        <Feature.SubsectionHeader
          className="account-settings__content"
          title={t('srs:learnings.settings.title')}
        />
        <Feature.SubsectionContent className="account-settings__content">
          <Settings className="learning-settings">
            <Settings.ItemTitle>
              {t('srs:learnings.settings.lessonLimits.title')}
            </Settings.ItemTitle>
            <Settings.ItemContent>
              <div className="learning-settings__lesson-limits">
                { LESSON_TYPES.map((type) => (
                  <div
                    key={type}
                    className="learning-settings__lesson-limit"
                    data-lesson-type={type}
                  >
                    <span
                      className="learning-settings__lesson-limit-label"
                      data-lesson-type={type}
                    >
                      {t(`srs:learnings.settings.lessonLimits.${type}`)}
                    </span>
                    <NumberInput
                      className="learning-settings__lesson-limit-value"
                      name={`settings.learning.lessonLimits.${type}`}
                      value={learning?.lessonLimits?.[type] || 1}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            </Settings.ItemContent>
          </Settings>
        </Feature.SubsectionContent>
      </Feature.Subsection>
    </>
  );
}
