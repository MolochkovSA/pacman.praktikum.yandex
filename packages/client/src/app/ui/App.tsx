import { Outlet } from 'react-router-dom';
import { Notification } from '@/entities/notification';

function App() {
  return (
    <div className="App">
      <Notification>
        <Outlet />
      </Notification>
    </div>
  );
}

export default App;
