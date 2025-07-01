import { useState, useCallback } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAppDispatch } from '../store/store';
import { userActions } from '../store/slices/userSlice';
// import { authData } from '../mock/authData';
import { useSelector } from "react-redux";
import { getUserAuthData } from '../store/selectors/getUserAuthData';
import { LoginModal } from './Auth/LoginModal';

const Header = () => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData)
  const dispatch = useAppDispatch();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])
  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])
  const onLogout = () => {
    dispatch(userActions.logout())
  }

  if (authData) {
    return (
      <AppBar position="static" style={{ minWidth: '100vw', marginBottom: '20px' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Личный кабинет</Typography>
          <Button color="inherit" onClick={onLogout}>Выйти</Button>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static" style={{ minWidth: '100vw', marginBottom: '20px' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Личный кабинет</Typography>
        <Button color="inherit" onClick={onShowModal}>Войти</Button>
        {
          isAuthModal && <LoginModal
            open={isAuthModal}
            onClose={onCloseModal}
          />
        }
      </Toolbar>
    </AppBar>
  )
};

export default Header;
