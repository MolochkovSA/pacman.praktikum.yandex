import { Outlet } from 'react-router-dom';
import { Notification } from '@/entities/notification';
import { GlobalErrorHandler } from '../providers/ErrorBoundary';
import { ThemeProvider } from '../providers/ThemeProvider';

function App() {
  return (
    <div className="App">
      <GlobalErrorHandler>
        <ThemeProvider>
          <Notification>
            <Outlet />
          </Notification>
        </ThemeProvider>
      </GlobalErrorHandler>
    </div>
  );
}

export default App;
