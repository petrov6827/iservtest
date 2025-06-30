import 'dayjs/locale/ru';
import dayjs from 'dayjs';
// import { useSelector } from 'react-redux'
// import { getUserAuthData } from './store/selectors/getUserAuthData'
import { authData } from './mock/authData';
import { Payments } from './components/Payments'
import Layout from './components/Layout'

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
