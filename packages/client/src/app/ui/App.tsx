import { Outlet } from 'react-router-dom';
import { Notification } from '@/entities/notification';
import { GlobalErrorHandler } from '@/features/ErrorBoundary/ErrorHandler';

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
