import React from 'react';

export interface InputProps {
  className?: string;
  required?: boolean;
  label: string;
  name: string;
  value?: string;
  pattern?: string;
  min?: number;
  max?: number;
  type?: 'text' | 'password';
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
