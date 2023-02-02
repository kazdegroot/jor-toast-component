import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ variant, children, onDismiss }) {
  const Icon = ICONS_BY_VARIANT[variant];
  if (!Icon) throw new Error(`Unknown variant type ${variant}, expecting: ${Object.keys(ICONS_BY_VARIANT)}`)
  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant} - </VisuallyHidden>
        {children}
      </p>
      <button className={styles.closeButton} onClick={onDismiss} aria-live="off" aria-label='Dismiss message'>
        <X size={24} />
      </button>
    </div>
  );
}

export default Toast;
