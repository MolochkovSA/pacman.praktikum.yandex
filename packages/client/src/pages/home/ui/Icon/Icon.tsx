import { FC } from 'react';
import styles from './Icon.module.scss';
import clsx from 'clsx';

interface IconProps {
  size?: number;
  src: string;
  type?: string;
  className?: string;
  onClick?: () => void;
  isPointer?: boolean;
  onBlur?: () => void;
}

const icons = import.meta.glob('/src/assets/svg/*.svg', { eager: true, as: 'url' });

export const Icon: FC<IconProps> = ({ type = 'svg', isPointer = false, ...props }) => {
  const path = `/src/assets/${type}/`;
  const suffix = `.${type}`;

  const imagePath = icons[path + props.src + suffix];

  if (!imagePath) {
    console.warn(`Icon not found: ${props.src}`);
    return null;
  }

  if (props)
    return (
      <img
        className={clsx(styles.icon, { [styles.icon__pointer]: isPointer })}
        {...props}
        onBlur={props.onBlur}
        width={props.size ?? 10}
        height={props.size ?? 10}
        src={imagePath}
        onClick={props.onClick}
      />
    );
};
