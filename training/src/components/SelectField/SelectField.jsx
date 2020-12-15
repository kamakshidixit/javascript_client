/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Select, Err } from './style';

const SelectField = (props) => {
  const {
    options, defaultOptions, onChange, error, onBlur,
  } = props;

  return (
    <>
      <Select error={error} onBlur={onBlur} onChange={onChange}>

        {defaultOptions && <option>{defaultOptions}</option>}

        {
          options && options.length && options.map(({ value, label }) => (
            <option key={label} value={value}>{label}</option>
          ))
        }

      </Select>
      <Err>{error}</Err>
    </>
  );
};
SelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  defaultOptions: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  onBlur: PropTypes.string.isRequired,
};
SelectField.defaultProps = {
  options: [],
  error: '',
  defaultOptions: 'Select',
};

export default SelectField;
