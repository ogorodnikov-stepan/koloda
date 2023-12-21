import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Modal from 'features/app/ui/modal/modal';
import Button from 'features/app/ui/form/button';

interface Props {
  isNecessary: boolean;
  url: string;
  prefix: string;
}

export default function LessonTerminateDialog({ isNecessary, url, prefix }: Props) {
  const { t } = useTranslation();
  const { push } = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    if (isNecessary) {
      setIsOpen((prev) => !prev);
    } else {
      push(url);
    }
  }, [isNecessary, setIsOpen]);

  const handleConfirmClick = useCallback(() => {
    push(url);
  }, [url]);

  return (
    <>
      <Button
        className="lesson__terminate-button"
        onClick={toggle}
        title={t(`${prefix}.button.tooltip`)}
        content={t(`${prefix}.button.text`)}
      />
      { isOpen && (
        <Modal
          close={toggle}
        >
          <div className="lesson__terminate-content">
            <span className="lesson__terminate-message">
              {t(`${prefix}.message`)}
            </span>
            <div className="lesson__terminate-actions">
              <Button
                className="lesson__terminate-confirm"
                onClick={handleConfirmClick}
                content={t(`${prefix}.confirm`)}
              />
              <Button
                className="lesson__terminate-cancel"
                onClick={toggle}
                content={t(`${prefix}.cancel`)}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
