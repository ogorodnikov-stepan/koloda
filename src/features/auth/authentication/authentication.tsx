import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import urls from 'features/app/routing/urls';
import { Tabs, TabsHeader, TabHeader, TabContent } from 'features/app/ui/tabs/tabs';
import Feature from 'features/app/ui/feature/feature';
import Signup from './signup';
import Login from './login';
import './authentication.scss';

const PREFIX = 'auth:authentication';

export default function Auth() {
  const { t } = useTranslation();

  return (
    <Feature entity="authentication">
      <Tabs>
        <Feature.Header>
          <TabsHeader>
            <TabHeader>{t(`${PREFIX}.login.title`)}</TabHeader>
            <TabHeader disabled>{t(`${PREFIX}.signup.title`)}</TabHeader>
          </TabsHeader>
        </Feature.Header>
        <Feature.Content>
          <TabContent><Login /></TabContent>
          <TabContent><Signup /></TabContent>
        </Feature.Content>
      </Tabs>
      <Feature.Footer>
        <Link
          className="authentication__demo-link"
          to={urls.home({ isDemo: true })}
        >
          {t(`${PREFIX}.demo`)}
        </Link>
      </Feature.Footer>
    </Feature>
  );
}
