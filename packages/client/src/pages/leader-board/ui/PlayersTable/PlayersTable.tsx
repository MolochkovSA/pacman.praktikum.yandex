import { Table } from 'react-bootstrap';

import { PlayerRow } from '../PlayerRow/PlayerRow';
import { PlayerListResponseDto } from '../../model/types';

import styles from './PlayersTable.module.scss';

type Props = {
  players: PlayerListResponseDto | undefined;
};
export const PlayersTable = ({ players }: Props) => {
  const playersList = players?.map((player, index) => (
    <PlayerRow
      key={player.data.id}
      position={index + 1}
      player={player.data}
    />
  ));

  if (!playersList?.length) return <div className={styles.noData}>Список игроков пуст</div>;

  return (
    <Table
      hover
      className={styles.table}>
      <thead>
        <tr>
          <th>Позиция</th>
          <th>Логин</th>
          <th>Очки</th>
          <th>Время</th>
        </tr>
      </thead>
      <tbody>{playersList}</tbody>
    </Table>
  );
};
