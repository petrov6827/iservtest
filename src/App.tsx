import Layout from './components/Layout'
import { Payments } from './components/Payments'
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux'
import { getUserAuthData } from './store/selectors/getUserAuthData'
import { authData } from './mock/authData';

dayjs.locale('ru');

function App() {
  // const { authData } = useSelector(getUserAuthData);

  return (
    <Layout>
      {authData && <Payments />}
    </Layout>
  );
}

export default App;
