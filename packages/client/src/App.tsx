import './App.css';
import { SignUpPage } from '@/pages/signup/ui';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LoginPage } from '@/pages/login/ui';
import { useEffect } from 'react';
import { AuthorizationService } from '@/shared/api';
import { userStoreService } from '@/shared/lib';
import { AuthWatcher } from '@/app/providers/auth';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/login' && location.pathname !== '/signup') {
      const authService = new AuthorizationService();
      authService
        .getUser()
        .then((user) => {
          userStoreService.user = user;
        })
        .catch((error) => {
          navigate('/login');
        });
    }
  }, [navigate]);

  return (
    <div className="App">
      <AuthWatcher />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/signup"
          element={<SignUpPage />}
        />
        {/*<Route path="/profile" element={<ProfilePage/>}/>*/}
        {/*<Route path="/home" element={<HomePage/>}/>*/}
        {/*<Route path="/game" element={<GamePage/>}/>*/}
        {/*<Route path="/leaderboard" element={<LeaderboardPage/>}/>*/}
        {/*<Route path="/forum" element={<ForumPage/>}/>*/}
        {/*<Route path="/forum/:id" element={<ForumTopicPage/>}/>*/}
        {/*<Route path="/not_found" element={<PageError404/>}/>*/}
        {/*<Route path="/server_error" element={<PageError500/>}/>*/}
        {/*<Route path="*" element={<Navigate to="/login" />}/>*/}
      </Routes>
    </div>
  );
}

export default App;
