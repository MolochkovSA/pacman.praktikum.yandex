import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';
import { SlLogout, SlSettings } from 'react-icons/sl';

import UserInfo from '../UserInfo/UserInfo';

import styles from './UserDropdown.module.scss';

export const UserDropdown = () => {
  const navigate = useNavigate();
  const [dropdownShow, setDropdownShow] = useState(false);

  const logout = () => {
    navigate('/auth/login'); // Todo: logout
  };

  return (
    <Dropdown onToggle={setDropdownShow}>
      <Dropdown.Toggle
        as={UserInfo}
        show={dropdownShow}
        id="dropdown-custom-components"
      />

      <Dropdown.Menu
        className={styles.menu}
        align="end"
        popperConfig={{ modifiers: [{ name: 'offset', options: { offset: [0, 20] } }] }}>
        <Link
          className={styles.link}
          to="/settings">
          <SlSettings className={styles.icon} />
          <span>Профиль</span>
        </Link>

        <Link
          className={styles.link}
          to="/"
          onClick={logout}>
          <SlLogout className={styles.icon} />
          <span>Выйти</span>
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
};
