import { PropsWithChildren, ReactNode } from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';

import { Button } from '../Button/Button';

import './modal.scss';

type ModalButtonProps = {
  label: ReactNode;
  type: 'submit' | 'button';
  onClick?: () => void;
};

type ModalProps = {
  showModal: boolean;
  showCloseButton?: boolean;
  title: string;
  okButton?: ModalButtonProps;
  cancelButton?: ModalButtonProps;
  onHide?: () => void;
};

export const Modal = ({
  showModal,
  showCloseButton = true,
  title,
  children,
  okButton,
  cancelButton,
  onHide
}: ModalProps & PropsWithChildren) => {
  return (
    <BootstrapModal
      show={showModal}
      onHide={onHide}
      centered>
      <BootstrapModal.Header closeButton={showCloseButton}>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body>{children}</BootstrapModal.Body>

      <BootstrapModal.Footer>
        {cancelButton && (
          <Button
            type={cancelButton.type}
            variant="outline-secondary"
            onClick={cancelButton.onClick}>
            {cancelButton.label}
          </Button>
        )}

        {okButton && (
          <Button
            type={okButton.type}
            variant="primary"
            onClick={okButton.onClick}>
            {okButton.label}
          </Button>
        )}
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};
