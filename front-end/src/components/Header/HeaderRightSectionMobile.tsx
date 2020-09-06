import React from 'react';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { signIn } from '../../types/user';
import { Router } from '../../../i18n';
import { iState } from '../../store';

const HeaderRightSectionMobile = ({
  mobileMenuId,
  handleMobileMenuOpen,
}: any) => {
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
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </>
      );
    }
    return (
      <Button
        variant="contained"
        style={{ whiteSpace: 'nowrap' }}
        color="secondary"
        type="button"
        onClick={redirectUnauthorized}
      >
        Log in
      </Button>
    );
  };

  return render();
};
export default HeaderRightSectionMobile;
