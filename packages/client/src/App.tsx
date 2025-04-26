import './App.css';
import { SignUpPage } from '@/pages/signup/ui';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/login/ui';
import React from 'react';

function App() {
  return (
    <div className="App">
      <Router>
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
          {/*<Route path="/profile" element={<ProfilePage}/>*/}
          {/*<Route path="/home" element={<HomePage}/>*/}
          {/*<Route path="/game" element={<GamePage}/>*/}
          {/*<Route path="/leaderboard" element={<LeaderboardPage}/>*/}
          {/*<Route path="/forum" element={<ForumPage}/>*/}
          {/*<Route path="/forum/:id" element={<ForumTopicPage}/>*/}
          {/*<Route path="/not_found" element={<PageError404}/>*/}
          {/*<Route path="/server_error" element={<PageError500}/>*/}
          {/*<Route path="*" element={<Navigate to="/login" />}/>*/}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
