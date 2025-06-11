import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Breadcrumbs.module.scss';

type Props = {
  links: { label: string; to: string }[];
};

export const Breadcrumbs = ({ links }: Props) => {
  const location = useLocation();

  return (
    <nav>
      <ul className={styles.wrapper}>
        {links.map((link, index) => (
          <li
            key={index}
            className={styles.item}>
            <Link
              to={link.to}
              className={clsx(styles.link, { [styles.active]: location.pathname === link.to })}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
