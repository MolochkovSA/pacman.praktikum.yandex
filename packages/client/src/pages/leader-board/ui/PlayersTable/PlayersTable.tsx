import { Table } from 'react-bootstrap';

import { PlayerPreview } from '../../model/types';
import { PlayerRow } from '../PlayerRow/PlayerRow';

import styles from './PlayersTable.module.scss';

type Props = {
  players: PlayerPreview[];
};

export const PlayersTable = ({ players }: Props) => {
  const playersList = players.map((player, index) => (
    <PlayerRow
      key={player.id}
      position={index + 1}
      player={player}
    />
  ));

  if (!playersList.length) return <div className={styles.noData}>Список игроков пуст</div>;

  return (
    <Table
      hover
      className={styles.table}>
      <thead>
        <tr>
          <th>Позиция</th>
          <th>Логин</th>
          <th>Очки</th>
          <th>Проведено игр</th>
          <th>Одержано побед</th>
        </tr>
      </thead>
      <tbody>{playersList}</tbody>
    </Table>
  );
};
