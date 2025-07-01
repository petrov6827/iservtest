import { memo, useCallback, useState } from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch } from '../../store/store';
import { Typography, Button, Input, Box, IconButton, InputAdornment, styled } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getLoginState } from '../../store/selectors/getLoginState';
import { loginActions, loginByUsername } from '../../store/slices/loginSlice';

const LoginFormBox = styled(Box)(() => ({
  display: 'flex',
  padding: '30px',
  maxWidth: '450px',
  minWidth: '320px',
  flexDirection: 'column',
  gap: '30px',
}));

const ErrorText = styled(Typography)(() => ({
  color: 'red',
  fontSize: '14px'
}))

const LoginForm = memo(() => {
  const dispatch = useAppDispatch();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { Username, Password, error } = useSelector(getLoginState);
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // const validateEmail = useCallback(() => {
  //   if (!emailRegex.test(Username)) {
  //     setEmailError('*Введите корректный email адрес');
  //     return false;
  //   }

  //   setEmailError(null);
  //   return true;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [Username]);

  const validatePassword = useCallback(() => {
    if (Password.length < 3) {
      setPasswordError('*Пароль должен содержать минимум 3 символа');
      return false;
    }

    setPasswordError(null);
    return true;
  }, [Password]);

  const onChangeUsername = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(loginActions.setUsername(e.target.value))
    if (emailError) setEmailError(null);
  }, [dispatch, emailError])

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(loginActions.setPassword(e.target.value))
    if (passwordError) setPasswordError(null);
  }, [dispatch, passwordError])

  const onLoginClick = useCallback(() => {
    // const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isPasswordValid) {
      return;
    }

    dispatch(loginByUsername({ Username, Password }))
  }, [dispatch, Password, Username, validatePassword])

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <LoginFormBox>
      <Typography variant='h6'>Войти в личный кабинет</Typography>
      <Input
        type="text"
        placeholder='Введите имя'
        onChange={onChangeUsername}
        value={Username}
      />
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder='Введите пароль'
        onChange={onChangePassword}
        value={Password}
        error={!!passwordError}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={togglePasswordVisibility}
              edge="end"
              aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <div>
        {emailError && <ErrorText>{emailError}</ErrorText>}
        {passwordError && <ErrorText>{passwordError}</ErrorText>}
        {error && <ErrorText>{error}</ErrorText>}
      </div>
      <Button
        onClick={onLoginClick}
        disabled={Password && Username ? false : true}
        variant='contained'
      >
        Войти
      </Button>
    </LoginFormBox>
  )
})

export default LoginForm;