import { useTranslation } from 'react-i18next';
import Feature from 'features/app/ui/feature/feature';
import './error.scss';

const PREFIX = 'app:pages.error.404';

export default function Error404() {
  const { t } = useTranslation();

  return (
    <Feature entity="error">
      <Feature.Header>
        <Feature.Title>
          {t(`${PREFIX}.title`)}
        </Feature.Title>
      </Feature.Header>
      <Feature.Content>
        <div
          className="error"
          data-code="404"
        >
          {t(`${PREFIX}.text`)}
        </div>
      </Feature.Content>
    </Feature>
  );
}
