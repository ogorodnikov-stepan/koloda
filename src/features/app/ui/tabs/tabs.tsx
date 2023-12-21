import clsx from 'clsx';
import { Tabs as ReactTabs, Tab, TabList, TabPanel, TabsProps } from 'react-tabs';
import './tabs.scss';

export function Tabs({ children, ...props }: TabsProps) {
  return (
    <ReactTabs
      className="tabs"
      disabledTabClassName="disabled"
      selectedTabClassName="selected"
      selectedTabPanelClassName="selected"
      {...props}
    >
      {children}
    </ReactTabs>
  );
}

export function TabsHeader({ className, ...props }: any) {
  return (
    <TabList
      className={clsx(className, 'tabs-header')}
      {...props}
    />
  );
}
TabsHeader.tabsRole = 'TabList';

export function TabHeader({ className, children, ...props }: any) {
  return (
    <Tab
      className={clsx(className, 'tab__header')}
      {...props}
    >
      {children}
    </Tab>
  );
}
TabHeader.tabsRole = 'Tab';

export function TabContent({ className, ...props }: any) {
  return (
    <TabPanel
      className={clsx(className, 'tab__content')}
      {...props}
    />
  );
}
TabContent.tabsRole = 'TabPanel';
