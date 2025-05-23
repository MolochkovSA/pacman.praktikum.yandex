import Modal from 'react-bootstrap/Modal';
import type { ReactNode } from 'react';

import styles from './modal.module.scss';

import { Button } from '../Button/Button';

type BaseModalProps = {
  show: boolean;
  title: string;
  btnText: string;
  children?: ReactNode;
  onHide: () => void;
  submit: () => void;
  closeBtn?: boolean;
  size?: 'sm' | 'lg' | 'xl';
  footer?: ReactNode;
};

export const BaseModal = ({
  show,
  title,
  children,
  btnText,
  onHide,
  submit,
  closeBtn = true,
  size = 'sm',
  footer
}: BaseModalProps) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName={styles.modal__content}
      size={size}>
      <Modal.Header
        closeButton={closeBtn}
        className={styles.modal__header}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal__body}>{children}</Modal.Body>
      <Modal.Footer className={styles.modal__footer}>
        <Button
          type="submit"
          onClick={submit}>
          {btnText}
        </Button>
        {footer}
      </Modal.Footer>
    </Modal>
  );
};
