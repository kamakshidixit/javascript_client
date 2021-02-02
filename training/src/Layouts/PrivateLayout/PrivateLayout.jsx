/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from '../components/index';

const PrivateLayout = ({ children, ...rest }) => (
  <div>
    <NavBar />
    <br />
    <div>{ children }</div>
  </div>
);

PrivateLayout.propTypes = {
  children: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default PrivateLayout;
