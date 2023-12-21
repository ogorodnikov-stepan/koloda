import { useTranslation } from 'react-i18next';
import { Tabs, TabsHeader, TabHeader, TabContent } from 'features/app/ui/tabs/tabs';
import Feature from 'features/app/ui/feature/feature';
import Signup from './signup';
import Login from './login';
import './authentication.scss';

export default function Auth() {
  const { t } = useTranslation('auth');

  return (
    <Feature className="authentication">
      <Tabs>
        <Feature.Header>
          <TabsHeader>
            <TabHeader>{t('authentication.login.title')}</TabHeader>
            <TabHeader disabled>{t('authentication.signup.title')}</TabHeader>
          </TabsHeader>
        </Feature.Header>
        <Feature.Content>
          <TabContent><Login /></TabContent>
          <TabContent><Signup /></TabContent>
        </Feature.Content>
      </Tabs>
    </Feature>
  );
}
