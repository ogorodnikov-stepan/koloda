// import { useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Feature from 'features/app/ui/feature/feature';
import Settings from 'features/app/ui/settings/settings';
import Avatar from 'features/auth/profile/avatar/avatar';
import { State } from './account-reducer';

// const PREFIX = 'auth:account';
const TYPES = ['new', 'rep'] as const;

interface Props {
  state: State;
}

export default function AccountContentView({ state }: Props) {
  const { t } = useTranslation();
  const { profile, settings: { learning } } = state.user.data!;

  return (
    <>
      <Feature.Subsection className="account-profile">
        <Feature.SubsectionContent className="account-profile__content">
          <div className="account-profile__user">
            <Avatar
              className="account-profile__user-avatar"
              profile={profile}
            />
            <span className="account-profile__user-full-name">
              {profile?.fullName}
            </span>
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
                { TYPES.map((type) => (
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
                    <span className="learning-settings__lesson-limit-value">
                      {learning?.lessonLimits?.[type] || 1}
                    </span>
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
