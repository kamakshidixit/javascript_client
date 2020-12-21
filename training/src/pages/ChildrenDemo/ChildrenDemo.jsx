import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import Math from '../../components/Math/Math';
import Theme from '../../theme';
// eslint-disable-next-line no-unused-vars
import NavBar from '../../Layouts/components/NavBar/NavBar';

class ChildrenDemo extends React.Component {
  getResult() {
    let { result } = this.state;
    result = '';
    this.setState({ result });
  }

  render() {
    return (
      <>
        <NavBar />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <ThemeProvider theme={Theme}>
          <Math first={7} second={4} operator="+" />
          <Math first={7} second={3} operator="-" />
          <Math first={7} second={20} operator="*" />
          <Math first={7} second={0} operator="/" />
          <Math first={7} second={8} operator="^" />
          <Math first={7} second={4} operator="+">
            {
              (first, second, result) => (
                <p>
                  Sum of
                  {' '}
                  {first}
                  {' '}
                  and
                  {' '}
                  {second}
                  {' '}
                  is equal to
                  {' '}
                  {result}
                  {' '}
                </p>
              )
            }
          </Math>
          <Math first={3} second={4} operator="+">
            {
              (first, second, result) => (
                <p>
                  When We add
                  {' '}
                  {first}
                  {' '}
                  with
                  {' '}
                  {second}
                  {' '}
                  than we will get
                  {' '}
                  {result}
                  {' '}
                  as result
                </p>
              )
            }
          </Math>
        </ThemeProvider>
      </>
    );
  }
}

export default ChildrenDemo;
