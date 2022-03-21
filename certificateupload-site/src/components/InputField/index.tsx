import React from 'react';
import styles from './InputField.module.scss';
import InputText from './inputText';

export interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  size?: number;
  error?: string;
  identity?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  identity,
  label,
  value,
  maxLength,
  minLength,
  placeholder,
  error,
  onChange,
  onBlur,
}) => {
  return (
    <div className={styles.inputField + ' ' + (error ? ` ${styles.hasError}` : '')}>
      <div className={styles.label}>{label}</div>
      <InputText
        identity={identity}
        label={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onBlur={onBlur} />
      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
  );
};

export default InputField;
