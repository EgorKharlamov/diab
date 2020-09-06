import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { iState } from '../../store';
import { signIn } from '../../types/user';
import { Router } from '../../../i18n';

const HeaderRightSectionDesktop = ({ handleProfileMenuOpen, menuId }: any) => {
  const { isLoggedIn } = useSelector<iState, iState['user']>(
    (state) => state.user,
  );
  const redirectUnauthorized = () => {
    if (isLoggedIn !== signIn.succeed) {
      Router.push('/login');
    }
    return null;
  };

  const render = () => {
    if (isLoggedIn === signIn.succeed) {
      return (
        <>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </>
      );
    }
    return (
      <Button
        variant="contained"
        color="secondary"
        style={{ whiteSpace: 'nowrap' }}
        type="button"
        onClick={redirectUnauthorized}
      >
        Log in
      </Button>
    );
  };
  return render();
};

export default HeaderRightSectionDesktop;
