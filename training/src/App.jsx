/* eslint-disable */
import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import { AuthRoute, PrivateRoute } from './routes/index';
import {
  Login, InputDemo, ChildrenDemo, Trainee, TextFieldDemo, NoMatch,
} from './pages/index';
import { SnackBarProvider } from './contexts/SnackBarProvider';
import { Homepage } from './pages/Homepage';
import { home } from './components/Homepage';

function App() {
  return (
    <div>
      <Router>
        <SnackBarProvider>
          <Switch>
            {/* <Route path = "/home" component={home}/> */}
            <Route path="/" exact>
              <Redirect to="/login" />
            </Route>
            <AuthRoute path="/login" component={Login} />
            <PrivateRoute path="/text-field" component={TextFieldDemo} />
            <PrivateRoute path="/childrenDemo" component={ChildrenDemo} />
            <PrivateRoute path="/inputDemo" component={InputDemo} />
            <PrivateRoute path="/trainee" component={Trainee} />
            <PrivateRoute path = "/home" component={Homepage} />
            <Route path = "/homepage" component={home} />
            <Route path = "/nofound" component={NoMatch} />
            <PrivateRoute component={NoMatch} />
          </Switch>
        </SnackBarProvider>
      </Router>
    </div>
  );
}

export default App;
