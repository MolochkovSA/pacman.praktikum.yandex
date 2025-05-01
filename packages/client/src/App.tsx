import { useEffect } from 'react';
import { ErrorPage } from './pages/error/ui/ErrorPage';

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
  // return <ErrorPage errorType="404"></ErrorPage>;
}

export default App;
