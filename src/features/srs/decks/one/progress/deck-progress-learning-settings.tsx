import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useStore, isDemoSelector } from 'features/app/app-store';
import urls from 'features/app/routing/urls';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import Settings from 'features/app/ui/settings/settings';
import NumberInput from 'features/app/ui/form/number-input';

const PREFIX = 'srs:decks.one.progress.learning.settings';
const TYPES = ['new', 'rep'] as const;

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckProgressLearningSettings({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const isDemo = useStore(isDemoSelector);
  const { data: { repping, settings } = {}, status: { editbar: { mode } } } = state.learning;

  const updateSetting = useCallback(({ target: { name, value } }) => {
    dispatch(['learningUpdated', { path: name, value }]);
  }, []);

  return (
    <section className="deck-progress__learning-settings">
      <h3 className="deck-progress__learning-settings-title">
        {t(`${PREFIX}.title`)}
      </h3>
      <Settings className="learning-settings">
        { !!repping && (
          <>
            <Settings.ItemTitle>
              {t(`${PREFIX}.repping`)}
            </Settings.ItemTitle>
            <Settings.ItemContent>
              <span className="learning-settings__repping">
                <Link
                  className="deck-progress__repping-link"
                  to={urls.repping({ id: repping.id, isDemo })}
                >
                  {repping.title}
                </Link>
              </span>
            </Settings.ItemContent>
          </>
        )}
        <Settings.ItemTitle>
          {t(`${PREFIX}.lessonLimits.title`)}
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
                  {t(`${PREFIX}.lessonLimits.${type}`)}
                </span>
                { mode === 'edit' ? (
                  <NumberInput
                    className="learning-settings__lesson-limit-value"
                    name={`settings.lessonLimits.${type}`}
                    value={settings?.lessonLimits?.[type] || 1}
                    onChange={updateSetting}
                  />
                ) : (
                  <span className="learning-settings__lesson-limit-value">
                    {settings?.lessonLimits?.[type] || 1}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Settings.ItemContent>
      </Settings>
    </section>
  );
}
