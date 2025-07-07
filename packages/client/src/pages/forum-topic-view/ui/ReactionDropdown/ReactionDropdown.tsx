import { useCallback, useMemo, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';

import { Reaction, ReactionId } from '@/entities/reaction';
import ReactionToggle from '../ReactionToggle/ReactionToggle';

import styles from './ReactionDropdown.module.scss';

type Props = {
  reactionsList: Reaction[];
  onAddReaction: (reactionId: ReactionId) => void;
};

export const ReactionDropdown = ({ reactionsList, onAddReaction }: Props) => {
  const [dropdownShow, setDropdownShow] = useState(false);

  const handleAddReaction = useCallback(
    (reactionId: ReactionId) => {
      onAddReaction(reactionId);
      setDropdownShow(false);
    },
    [onAddReaction]
  );

  const Reactions = useMemo(
    () =>
      reactionsList.map((r) => (
        <Button
          key={r.id}
          className={styles.button}
          onClick={() => handleAddReaction(r.id)}>
          {r.emoji}
        </Button>
      )),
    [reactionsList, handleAddReaction]
  );

  return (
    <Dropdown
      onToggle={setDropdownShow}
      show={dropdownShow}>
      <Dropdown.Toggle
        as={ReactionToggle}
        id="reaction-dropdown"
      />

      <Dropdown.Menu
        className={styles.menu}
        align="end"
        popperConfig={{ modifiers: [{ name: 'offset', options: { offset: [-60, -70] } }] }}>
        <div className={styles.reactions}>{Reactions}</div>
      </Dropdown.Menu>
    </Dropdown>
  );
};
