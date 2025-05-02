import clsx from 'clsx';
import { Form, InputGroup } from 'react-bootstrap';
import { FormControlProps } from 'react-bootstrap/FormControl';
import { IconType } from 'react-icons';

import styles from './Input.module.scss';
import { forwardRef } from 'react';

export interface Props extends FormControlProps {
  label?: string;
  error?: string;
  PrependIcon?: IconType;
  AppendIcon?: IconType;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ error, className, label, PrependIcon, AppendIcon, ...props }, ref) => {
    return (
      <Form.Group
        className={clsx(styles.input__wrapper, className)}
        controlId={props.id || props.name}>
        {label && <Form.Label className={styles.input__label}>{label}</Form.Label>}
        <InputGroup
          className={clsx({ [styles.prependIconGroup]: !!PrependIcon, [styles.appendIconGroup]: !!AppendIcon })}>
          {PrependIcon && <PrependIcon className={styles.prependIcon} />}

          <Form.Control
            {...props}
            ref={ref}
            className={clsx(styles.input, { [styles.invalid]: error })}
            isInvalid={!!error}
          />

          {AppendIcon && <AppendIcon className={styles.appendIcon} />}

          <Form.Control.Feedback
            type="invalid"
            className={styles.error}>
            {error}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    );
  }
);
