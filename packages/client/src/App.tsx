import './App.css';
import { SignInPage } from '@/pages/signin/ui';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { LoginPage } from '@/pages/login/ui';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/login" />}
          />
          <Route
            exact
            path="/login"
            component={LoginPage}
          />
          <Route
            exact
            path="/signin"
            component={SignInPage}
          />
          {/*<Route path="/profile" component={ProfilePage}/>*/}
          {/*<Route path="/home" component={HomePage}/>*/}
          {/*<Route path="/game" component={GamePage}/>*/}
          {/*<Route path="/leaderboard" component={LeaderboardPage}/>*/}
          {/*<Route path="/forum" component={ForumPage}/>*/}
          {/*<Route path="/forum/:id" component={ForumTopicPage}/>*/}
          {/*<Route path="/not_found" component={PageError404}/>*/}
          {/*<Route path="/server_error" component={PageError500}/>*/}
          {/*<Route path="*" render={() => <Redirect to="/not_found" />}/>*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
