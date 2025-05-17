import React from 'react';
import { Link } from 'react-router-dom';
import { GiTrophyCup } from 'react-icons/gi';

import { PlayerPreview } from '../../model/types';

import styles from './PlayerRow.module.scss';

type Props = {
  player: PlayerPreview;
  position: number;
};

const cups: Record<number, React.ReactElement | undefined> = {
  1: (
    <GiTrophyCup
      size={16}
      className={styles.first}
    />
  ),
  2: (
    <GiTrophyCup
      size={16}
      className={styles.second}
    />
  ),
  3: (
    <GiTrophyCup
      size={16}
      className={styles.third}
    />
  )
};

export const PlayerRow = ({ player: { id, login, achievement, wins, games }, position }: Props) => {
  const playerProfileUrl = `/profile/${id}`;

  return (
    <tr className={styles.row}>
      <td className={styles.position}>
        {cups[position]}
        {position}
      </td>
      <td>
        <Link
          className={styles.login}
          to={playerProfileUrl}>
          {login}
        </Link>
      </td>
      <td>{achievement}</td>
      <td>{games}</td>
      <td>{wins}</td>
    </tr>
  );
};
