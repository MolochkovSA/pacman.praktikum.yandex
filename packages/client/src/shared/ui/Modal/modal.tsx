import Modal from 'react-bootstrap/Modal';
import type { ReactNode } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './modal.module.scss';

import { Button } from '../Button/Button';

type BaseModalProps = {
  show: boolean;
  title: string;
  btnText: string;
  children?: ReactNode;
  onHide: () => void;
  submit: () => void;
  closeBtn: boolean;
};

export const BaseModal = ({ show, title, children, btnText, onHide, submit, closeBtn = true }: BaseModalProps) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName={styles.modal__content}>
      <Modal.Header
        closeButton={closeBtn}
        className={styles.modal__header}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal__body}>{children}</Modal.Body>
      <Modal.Footer className={styles.modal__footer}>
        <Button
          type="submit"
          name={btnText}
          handleClick={submit}></Button>
      </Modal.Footer>
    </Modal>
  );
};
