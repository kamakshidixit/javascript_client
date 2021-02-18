/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { PrivateLayout } from '../Layouts';

const PrivateRoute = function ({ component: Component, ...rest }) {
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(matchProps) => {
        if ((token !== 'undefined') && token) {
          console.log('------------------------------------');
          return (
            <PrivateLayout>
              <Component {...matchProps} />
            </PrivateLayout>
          );
        }
        return (
          <Route>
            <Redirect to="/login" />
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
