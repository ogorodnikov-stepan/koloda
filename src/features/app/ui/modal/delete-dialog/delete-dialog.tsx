import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { UseMutationResult } from 'react-query';
import { HTTPParams } from 'features/app/api/request';
import Modal from 'features/app/ui/modal/modal';
import Button from 'features/app/ui/form/button';
import './delete-dialog.scss';

const NAVIGATE_TIMEOUT = 1000;

interface Props {
  params: HTTPParams;
  mutation: UseMutationResult;
  url?: string;
  prefix: string;
}

export default function DeleteDialog({ params, mutation, url, prefix }: Props) {
  const { t } = useTranslation();
  const { push } = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const handleDelete = useCallback(() => {
    mutation.mutate(params);
  }, [params]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mutation.isSuccess && url) push(url);
    }, NAVIGATE_TIMEOUT);
    return () => clearTimeout(timer);
  }, [mutation.isSuccess]);

  return (
    <>
      <Button
        className="delete-dialog__open delete-button"
        onClick={toggle}
        content={t(`${prefix}.open`)}
      />
      { isOpen && (
        <Modal
          close={toggle}
        >
          <div className="delete-dialog__content">
            <span className="delete-dialog__message">
              {t(`${prefix}.message`)}
            </span>
            <span
              className="delete-dialog__status"
              data-status={mutation.status}
            >
              {t(`${prefix}.status.${mutation.status}`)}
            </span>
            { mutation.isIdle && (
              <div className="delete-dialog__actions">
                <Button
                  className="delete-dialog__confirm"
                  onClick={handleDelete}
                  disabled={!mutation.isIdle}
                  content={t(`${prefix}.confirm`)}
                />
                <Button
                  className="delete-dialog__cancel"
                  onClick={toggle}
                  content={t(`${prefix}.cancel`)}
                />
              </div>
            )}
            { mutation.isError && (
              <Button
                className="delete-dialog__close"
                onClick={toggle}
                content={t(`${prefix}.close`)}
              />
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
