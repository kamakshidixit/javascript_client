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

function App() {
  return (
    <div>
      <Router>
        <SnackBarProvider>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/trainee" />
            </Route>
            <AuthRoute path="/login" component={Login} />
            <PrivateRoute path="/text-field" component={TextFieldDemo} />
            <PrivateRoute path="/childrenDemo" component={ChildrenDemo} />
            <PrivateRoute path="/inputDemo" component={InputDemo} />
            <PrivateRoute path="/trainee" component={Trainee} />
            <PrivateRoute component={NoMatch} />
          </Switch>
        </SnackBarProvider>
      </Router>
    </div>
  );
}

export default App;
