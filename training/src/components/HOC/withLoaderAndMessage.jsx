/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const hoc = (WrappedComponent) => (props) => {
  const { loader, count, ...rest } = props;
  if (loader) {
    return (
      <Box paddingLeft="50%">
        <CircularProgress />
      </Box>
    );
  }
  if (!count) {
    return (
      <Box paddingLeft={50}>
        <h2>Oops No more Trainees</h2>
      </Box>
    );
  }
  return (<WrappedComponent loader={loader} count={count} {...rest} />);
};

export default hoc;
