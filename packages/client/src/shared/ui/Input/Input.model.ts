import React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  isInvalid?: boolean;
  type?: 'text' | 'password';
  error?: string;
};
