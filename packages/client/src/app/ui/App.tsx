import { Outlet } from 'react-router-dom';
import { Notification } from '@/entities/notification';
import { GlobalErrorHandler } from '../providers';

function App() {
  return (
    <div className="App">
      <GlobalErrorHandler>
        <Notification>
          <Outlet />
        </Notification>
      </GlobalErrorHandler>
    </div>
  );
}

export default App;
