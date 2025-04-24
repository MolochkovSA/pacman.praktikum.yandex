import React from 'react'

export interface ButtonProps {
  className?: string
  name: string
  type?: 'button' | 'submit'
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
