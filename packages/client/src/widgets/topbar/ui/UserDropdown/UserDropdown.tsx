import { useState } from 'react';
import { useNavigate } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';
import { SlLogout, SlSettings } from 'react-icons/sl';

import { RoutePath } from '@/shared/config/routeConfig';
import { useAuth } from '@/features/auth';
import UserInfo from '../UserInfo/UserInfo';

import styles from './UserDropdown.module.scss';
import { Button } from '@/shared/ui';
import { ThemeToggle } from '@/widgets/topbar/ui/ThemeToggle/ThemeToggle';

export const UserDropdown = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [dropdownShow, setDropdownShow] = useState(false);

  const goToProfile = () => {
    navigate(RoutePath.PROFILE.ROOT);
    setDropdownShow(false);
  };

  return (
    <Dropdown
      onToggle={setDropdownShow}
      show={dropdownShow}>
      <Dropdown.Toggle
        as={UserInfo}
        show={dropdownShow}
        id="dropdown-custom-components"
      />

      <Dropdown.Menu
        className={styles.menu}
        align="end"
        popperConfig={{ modifiers: [{ name: 'offset', options: { offset: [0, 20] } }] }}>
        <Button
          className={styles.button}
          onClick={goToProfile}>
          <SlSettings className={styles.icon} />
          <span>Профиль</span>
        </Button>

        <Button
          className={styles.button}
          onClick={logout}>
          <SlLogout className={styles.icon} />
          <span>Выйти</span>
        </Button>
        <ThemeToggle></ThemeToggle>
      </Dropdown.Menu>
    </Dropdown>
  );
};
