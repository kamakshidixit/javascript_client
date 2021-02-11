/* eslint-disable */
import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import { AuthRoute, PrivateRoute } from './routes/index';
import {
  Login, InputDemo, ChildrenDemo, Trainee, TextFieldDemo, NoMatch,
} from './pages/index';
import { ApolloProvider } from '@apollo/react-components';
import apolloClient from './libs/apollo-client';
import { SnackBarProvider } from './contexts/SnackBarProvider';

function App() {
  return (
    <div>
      <Router>
        <SnackBarProvider>
        <ApolloProvider client={apolloClient}>
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
          </ApolloProvider>
        </SnackBarProvider>
      </Router>
    </div>
  );
}

export default App;
