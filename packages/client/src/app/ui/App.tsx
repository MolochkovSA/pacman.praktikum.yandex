import { Outlet } from 'react-router-dom';
import { Notification } from '@/shared/ui/Notification/Notification.tsx';

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
