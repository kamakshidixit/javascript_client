/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { PrivateLayout } from '../Layouts';

const PrivateRoute = function ({ component: Component, ...rest }) {
  const token = localStorage.getItem('token');
  const decoded = JSON.parse(atob(token.split('.')[1]));

  console.log('-----------------------------', decoded.role);
  return (
    <Route
      {...rest}
      render={(matchProps) => {
        console.log(matchProps.match.path);
        if ((token !== 'undefined') && token && decoded.role === 'head-trainer') {
          return (
            <PrivateLayout>
              <Component {...matchProps} />
            </PrivateLayout>
          );
        }

        if ((decoded.role !== 'head-trainer') && matchProps.match.path !== '/'
        && matchProps.match.path !== '/text-field' && matchProps.match.path !== '/inputDemo'
        && matchProps.match.path !== '/childrenDemo' && matchProps.match.path !== '/trainee'
        && matchProps.match.path !== '/login') {
          return (
            <Route>
              <Redirect to="/homepage" />
            </Route>
          );
        }

        return (
          <Route>
            <Redirect to="/nofound" />
          </Route>
        );
      }}
    />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default PrivateRoute;
