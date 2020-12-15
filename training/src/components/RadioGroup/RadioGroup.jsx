/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { Input, Err } from './style';

const RadioGroup = (props) => {
  const {
    options, error, onChange, onBlur,
  } = props;

  return (
    <>
      {
        options && options.length && options.map(({ value, label }) => (
          <Fragment key={label}>
            <input type="radio" name="game" value={value} onChange={(event) => onChange(event)} onBlur={onBlur} error={error} />
            {label}
            <br />
          </Fragment>
        ))
      }
      <Err>{error}</Err>
    </>
  );
};
RadioGroup.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBlur: PropTypes.string.isRequired,
};

RadioGroup.defaultProps = {
  error: '',
  options: [],
};
export default RadioGroup;
