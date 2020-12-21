/* eslint-disable no-unused-vars */
import React from 'react';
import { TextField } from '../../components';
import { Div } from '../../components/TextField/style';
import { Slider } from '../../components/Slider';
import { banners, DEFAULT_BANNER_IMAGE } from '../../config/constant';
import NavBar from '../../Layouts/components/NavBar/NavBar';

// eslint-disable-next-line react/prefer-stateless-function
const TextFieldDemo = () => (
  <Div>
    <NavBar />
    &nbsp;&nbsp;&nbsp;
    <div>
      <Slider altText="No Image" duration="2000" height="200" random banner={banners} defaultbanner={DEFAULT_BANNER_IMAGE} />
    </div>
    <p><b>This is Disabled Input</b></p>
    <TextField disabled value="Disabled Input" />
    <p><b>A Valid Input</b></p>
    <TextField value="Accessible" />
    <p><b>An Input with an errors</b></p>
    <TextField error="Could not be more than" value="101" />
  </Div>
);

export default TextFieldDemo;
