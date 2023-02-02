import React from 'react';
import { useState } from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function createToast(message, variant = VARIANT_OPTIONS[0]) {
  return { id: crypto.randomUUID(), message, variant };
}

function ToastPlayground() {
  const [toasts, setToasts] = useState([createToast('test 123', 'warning')]);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0]);

  function addToast(message, variant) {
    setToasts(t => [...t, createToast(message, variant)]);
  }

  function dismissToast(id) {
    setToasts(t => t.filter(i => i.id !== id));
  }

  function handleSubmit(event) {
    event.preventDefault();
    addToast(message, variant);
    setMessage('');
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <div className={styles.controlsWrapper}>
        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: 'baseline' }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea id="message" className={styles.messageInput} value={message} onChange={e => { setMessage(e.target.value) }} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              <RadioSet options={VARIANT_OPTIONS} name="variant" value={variant} onChange={setVariant} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </form>
      </div>
      <ToastShelf toasts={toasts} dismissToast={dismissToast} />
    </div>
  );
}

function RadioSet({ options, name, id = '', value, onChange }) {
  const idBase = id || name;
  return <>
    {options.map(option => (
      <label key={option} htmlFor={`${idBase}-${option}`}>
        <input
          id={`${idBase}-${option}`}
          type="radio"
          name={name}
          value={option}
          checked={option === value}
          onChange={e => onChange(e.target.value)}
        />
        {option}
      </label>
    ))}
  </>
}

export default ToastPlayground;
