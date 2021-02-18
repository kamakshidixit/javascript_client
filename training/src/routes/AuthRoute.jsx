/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import * as PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthLayout } from '../Layouts/AuthLayout';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => {
      const token = localStorage.getItem('token');
      if (!((token !== 'undefined') && token)) {
        console.log('--------------->', localStorage.getItem('token'));
        return (
          <AuthLayout>
            <Component {...matchProps} />
          </AuthLayout>
        );
      }
      return (
        <Route>
          <Redirect to="/trainee" />
        </Route>
      );
    }}
  />
);

AuthRoute.propTypes = {
  component: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AuthRoute;
