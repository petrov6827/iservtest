import Layout from './components/Layout'
import { Payments } from './components/Payments'
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux'
import { getUserAuthData } from './store/selectors/getUserAuthData'
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch } from './store/store';
import { checkAuth } from './store/slices/userSlice';

dayjs.locale('ru');

function App() {
  const dispatch = useAppDispatch();
  const { isLoading, error, token } = useSelector(getUserAuthData);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Layout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>
          {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {token && <Payments />}
    </Layout>
  );
}

export default App;
