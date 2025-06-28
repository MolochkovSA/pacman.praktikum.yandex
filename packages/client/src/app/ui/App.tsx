import { Outlet } from 'react-router-dom';
import { Notification } from '@/entities/notification';
import { GlobalErrorHandler } from '../providers/ErrorBoundary';
import { ThemeProvider } from '../providers/ThemeProvider/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <GlobalErrorHandler>
          <Notification>
            <Outlet />
          </Notification>
        </GlobalErrorHandler>
      </div>
    </ThemeProvider>
  );
}

export default App;
