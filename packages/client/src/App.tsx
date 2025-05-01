import { useEffect } from 'react';
import { NotFoundPage } from './pages/error/ui';
import { ServerErrorPage } from './pages/error/ui';

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
  return <div className="App">Вот тут будет жить ваше приложение :)</div>;
  // return <NotFoundPage></NotFoundPage>;
  // return <ServerErrorPage></ServerErrorPage>;
}

export default App;
