import { PropsWithChildren } from 'react';
import BootstrapModal from 'react-bootstrap/Modal';

import { Button } from '../Button/Button';

import styles from './Modal.module.scss';

type ModalProps = {
  show: boolean;
  title: string;
  btnText: string;
  onHide: () => void;
  submit: () => void;
  closeBtn?: boolean;
};

export const Modal = ({
  show,
  title,
  children,
  btnText,
  onHide,
  submit,
  closeBtn = true
}: ModalProps & PropsWithChildren) => {
  return (
    <BootstrapModal
      show={show}
      onHide={onHide}
      centered
      contentClassName={styles.modal__content}>
      <BootstrapModal.Header
        closeButton={closeBtn}
        className={styles.modal__header}>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body className={styles.modal__body}>{children}</BootstrapModal.Body>
      <BootstrapModal.Footer className={styles.modal__footer}>
        <Button
          type="submit"
          onClick={submit}>
          {btnText}
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};
