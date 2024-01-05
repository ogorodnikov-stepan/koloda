import { useTranslation } from 'react-i18next';
import { useExportReppingMutation } from 'features/srs/reppings/reppings-queries';
import { Repping } from 'features/srs/srs-types';
import Button from 'features/app/ui/form/button';

const PREFIX = 'app:ui.feature.one.export';

interface Props {
  id?: Repping['id'];
}

export default function ReppingExport({ id }: Props) {
  const { t } = useTranslation();
  const { mutate, isLoading } = useExportReppingMutation({ isDemo: true });

  const handleCopyClick = () => {
    mutate({ id }, {
      onSuccess: (data) => {
        navigator.clipboard.writeText(JSON.stringify(data));
      },
    });
  };

  const handleDownloadClick = () => {
    mutate({ id }, {
      onSuccess: (data) => {
        const blob = new Blob([JSON.stringify(data)], { type: 'text/json' });
        const a = document.createElement('a');
        a.download = `${id}.json`;
        a.href = window.URL.createObjectURL(blob);
        const event = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        a.dispatchEvent(event);
        a.remove();
      },
    });
  };

  if (!id) return null;

  return (
    <div className="repping__export feature__export">
      <Button
        className="repping__export-copy feature__export-copy"
        title={t(`${PREFIX}.copy`)}
        disabled={isLoading}
        onClick={handleCopyClick}
      />
      <Button
        className="repping__export-download feature__export-download"
        title={t(`${PREFIX}.download`)}
        disabled={isLoading}
        onClick={handleDownloadClick}
      />
    </div>
  );
}
