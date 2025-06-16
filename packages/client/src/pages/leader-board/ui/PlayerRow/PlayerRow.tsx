import React from 'react';
import { Link } from 'react-router-dom';
import { GiTrophyCup } from 'react-icons/gi';
import { GrFireball } from 'react-icons/gr';

import { getProfilePath } from '@/shared/lib/router';
import { Player } from '../../model/types';
import { formatTime } from '@/features/gameTimer';

import styles from './PlayerRow.module.scss';

type Props = {
  player: Player;
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

export const PlayerRow = ({ player: { id, login, pacman_score, time }, position }: Props) => {
  const playerProfileUrl = getProfilePath(id);

  return (
    <tr className={styles.row}>
      <td className={styles.position}>
        {cups[position]}
        {position}
      </td>
      <td>
        <Link to={playerProfileUrl}>{login}</Link>
      </td>
      <td className={styles.achievement}>
        <GrFireball size={12} />
        {pacman_score}
      </td>
      <td>{formatTime(time)}</td>
    </tr>
  );
};
