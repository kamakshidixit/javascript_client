/* eslint-disable linebreak-style */
import React from 'react';
import { TextField } from '../../components';
import { Div } from '../../components/TextField/style';

const TextFieldDemo = () => (
  <Div>
    <p><b>This is a Disabled Input</b></p>
    <TextField disabled value="Disabled Input" />
    <p><b> A Valid Input</b></p>
    <TextField value="Accessible" />
    <p><b>An Input with errors </b></p>
    <TextField error="Could not be greater than" value="101" />
  </Div>
);

export default TextFieldDemo;
