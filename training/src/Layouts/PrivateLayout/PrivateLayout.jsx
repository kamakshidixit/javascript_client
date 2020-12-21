import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const PrivateLayout = ({ children, ...rest }) => (
  <div className="main">{children}</div>
);

PrivateLayout.propTypes = {
  children: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default PrivateLayout;
