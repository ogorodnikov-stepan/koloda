import clsx from 'clsx';
import { BasicProps } from 'features/app/app-types';
import SettingsItem from './settings-item';
import SettingsItemTitle from './settings-item-title';
import SettingsItemContent from './settings-item-content';
import './settings.scss';

interface Props extends BasicProps {
  className?: string;
}

function Settings({ className, children }: Props) {
  return (
    <dl className={clsx(className, 'settings')}>
      { children }
    </dl>
  );
}

Settings.Item = SettingsItem;
Settings.ItemTitle = SettingsItemTitle;
Settings.ItemContent = SettingsItemContent;

export default Settings;
