import { useTranslation } from 'react-i18next';
import { useExportDeckMutation } from 'features/srs/decks/decks-queries';
import { Deck } from 'features/srs/srs-types';
import Button from 'features/app/ui/form/button';

const PREFIX = 'app:ui.feature.one.export';

interface Props {
  id?: Deck['id'];
}

export default function DeckExport({ id }: Props) {
  const { t } = useTranslation();
  const { mutate, isLoading } = useExportDeckMutation({ isDemo: true });

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
    <div className="deck__export feature__export">
      <Button
        className="deck__export-copy feature__export-copy"
        title={t(`${PREFIX}.copy`)}
        disabled={isLoading}
        onClick={handleCopyClick}
      />
      <Button
        className="deck__export-download feature__export-download"
        title={t(`${PREFIX}.download`)}
        disabled={isLoading}
        onClick={handleDownloadClick}
      />
    </div>
  );
}
