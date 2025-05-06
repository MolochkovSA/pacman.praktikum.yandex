import { useEffect } from 'react';
import { ProfilePage } from './pages/profile';
import { LoginPage } from './pages/login';

import './app/styles/null.scss';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  // return <div className="App">Вот тут будет жить ваше приложение :)</div>;
  return <ProfilePage></ProfilePage>;
  // return <LoginPage></LoginPage>
}

export default App;
