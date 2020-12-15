/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Error, Input } from './style';

const TextField = (props) => {
  const {
    disabled, value, error, onChange, onBlur,
  } = props;
  if (error) {
    return (
      <>
        <Input type="text" value={value} error onChange={onChange} onBlur={onBlur} />
        <Error>{error}</Error>
      </>
    );
  }
  return (
    <Input type="text" value={value} disabled={disabled} onChange={onChange} onBlur={onBlur} />
  );
};

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.string.isRequired,
};
TextField.defaultProps = {
  disabled: false,
  error: '',
  onChange: '',
};

export default TextField;
