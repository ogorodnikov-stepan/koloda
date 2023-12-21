import { useTranslation } from 'react-i18next';
import ContentBlock from 'features/app/ui/block/content-block';
import './error.scss';

const KNOWN_STATUS_CODES = [
  500,
  502,
];

interface Props {
  status: number;
}

export default function Error502({ status }: Props) {
  const { t } = useTranslation('app');

  return (
    <ContentBlock className={`error status-${status}`}>
      <p>{t(KNOWN_STATUS_CODES.includes(status) ? `pages.error.${status}` : 'pages.error.unknown')}</p>
    </ContentBlock>
  );
}
