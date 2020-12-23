/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import { AuthRoute, PrivateRoute } from './routes/index';
import {
  Login, InputDemo, ChildrenDemo, Trainee, TextFieldDemo, NoMatch,
} from './pages';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/Trainee" />
          </Route>
          <PrivateRoute path="/login" component={Login} />
          <AuthRoute path="/text-field" component={TextFieldDemo} />
          <AuthRoute path="/childrenDemo" component={ChildrenDemo} />
          <AuthRoute path="/inputDemo" component={InputDemo} />
          <AuthRoute path="/trainee" component={Trainee} />
          <AuthRoute component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
