/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
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
            <AuthRoute component={Trainee} />
          </Route>
          <AuthRoute path="/login" component={Login} />
          <PrivateRoute path="/text-field" component={TextFieldDemo} />
          <PrivateRoute path="/childrenDemo" component={ChildrenDemo} />
          <PrivateRoute path="/inputDemo" component={InputDemo} />
          <PrivateRoute component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
