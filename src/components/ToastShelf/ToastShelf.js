import React from 'react';

import Toast from '../Toast';
import { useToastContext } from '../ToastProvider/ToastProvider';
import styles from './ToastShelf.module.css';

function ToastShelf() {
  const { toasts, dismissToast } = useToastContext();
  return (
    <ol className={styles.wrapper}
      role="region"
      aria-live="assertive"
      aria-label="Notification">
      {
        toasts.map(({ id, message, variant }) => (
          <li key={id} className={styles.toastWrapper}>
            <Toast onDismiss={() => dismissToast(id)} variant={variant}>{message}</Toast>
          </li>
        ))
      }
    </ol >
  );
}

export default ToastShelf;
