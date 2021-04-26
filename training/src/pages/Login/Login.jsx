/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button, InputAdornment,
  CardContent, Typography, Card, Avatar, CssBaseline, withStyles, CircularProgress,
} from '@material-ui/core';
import { Email, VisibilityOff, LockOutlined } from '@material-ui/icons';
import * as yup from 'yup';
import localStorage from 'local-storage';
import { Redirect } from 'react-router-dom';
import callApi from '../../libs/utils/api';
import { SnackBarContext } from '../../contexts';
import jwt_decode from 'jwt-decode';
import home from '../../components/Homepage';


const LoginStyle = (theme) => ({
  main: {
    width: 350,
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(62),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  icon: {
    background: 'red',
    marginLeft: theme.spacing(19),
    marginTop: theme.spacing(2),
  },
});

class Login extends React.Component {
  schema = yup.object().shape({
    email: yup.string()
      .trim().email().required('Email is a required field'),
    password: yup.string()
      .required('Password is a required field')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number'),
  });

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      role: '',
      loading: false,
      redirect: false,
      hasError: true,
      touched: {
        Email: false,
        Password: false,
      },
    };
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  };

  hasErrors = () => {
    try {
      this.schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  getError = (field) => {
    const { touched } = this.state;
    if (touched[field] && this.hasErrors()) {
      try {
        this.schema.validateSyncAt(field, this.state);
        return '';
      } catch (err) {
        return err.message;
      }
    }
    return '';
  };

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }



  onClickHandler = async (data, openSnackBar) => {
    // const role = this.state;
    this.setState({
      loading: true,
      hasError: true,
    });
    const response = await callApi(data, 'post', 'user/login');
    console.log('Data is :', data);


    console.log('ResponseToken', response);
    // Conditionally set token only when there is no error
    localStorage.set('token', response.token)

    this.setState({ loading: false });

    const Token = localStorage.get('token');
    // console.log('data', Token);
    // var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDJlMzQ2ZWJjNDI5MjQ5NmJhN2ZjNDYiLCJuYW1lIjoiSGVhZCBUcmFpbmVyIiwicm9sZSI6ImhlYWQtdHJhaW5lciIsImVtYWlsIjoiaGVhZC50cmFpbmVlQHN1Y2Nlc3NpdmUudGVjaCIsInBhc3N3b3JkIjoiJDJiJDEwJHZLRko1VC9YSno5V2VQUEQxZjBzN09WR00ub2xDakdieGxPVm9vVS9McjEvWFhzZW5JMy55Iiwib3JpZ2luYWxJZCI6IjYwMmUzNDZlYmM0MjkyNDk2YmE3ZmM0NiIsImNyZWF0ZWRBdCI6IjIwMjEtMDItMThUMDk6MzM6MzQuOTI2WiIsIl9fdiI6MCwiaWF0IjoxNjEzNjc1MTcwLCJleHAiOjMyMjczNTEyNDB9.6L_JF0y7hzE5qZ4g1swJffO_4ZaGMDxzwSH72lkSE9w';
    var decoded = jwt_decode(response.token);
    const a = decoded.role;
    this.setState({ role: a });
    console.log('-----------------------------', decoded);
    const { role } = decoded;
    console.log('hhh--', role);

    if (Token !== 'undefined') {

      this.setState({
        redirect: true,
        hasError: false,
        message: 'Login Permitted',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        message: 'Email or Password is incorrect',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  handleRedirect = () => {
    const { redirect, role } = this.state;
    console.log('eeee---', role);
    if (redirect && role ==='head-trainer' ) {
        return <Redirect to="/trainee" />;
      }
      if (redirect && role !=='head-trainer' ) {
        return <Redirect to="/homepage" />;
      }
    }

  render() {
    const { classes,role } = this.props;
    const {
      email, password, loading,
    } = this.state;
    console.log('www--', role);
    this.hasErrors();
    return (
      <>
        <div className={classes.main}>
          <CssBaseline />
          <Card open aria-labelledby="form-dialog-title">
            <Avatar className={classes.icon}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h4" align="center">Login</Typography>
            <CardContent>
              <form>
                <div>
                  <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Email Address"
                    variant="outlined"
                    helperText={this.getError('email')}
                    error={!!this.getError('email')}
                    onChange={this.handleChange('email')}
                    onBlur={() => this.isTouched('email')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <br />
                <div>
                  <TextField
                    required
                    type="password"
                    fullWidth
                    id="outlined-required"
                    label="Password"
                    variant="outlined"
                    helperText={this.getError('password')}
                    error={!!this.getError('password')}
                    onChange={this.handleChange('password')}
                    onBlur={() => this.isTouched('password')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VisibilityOff />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                &nbsp;&nbsp;
                <div>
                  <SnackBarContext.Consumer>
                    {({ openSnackBar }) => (
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={this.hasErrors()}
                        onClick={() => {
                          this.onClickHandler({ email, password }, openSnackBar);
                        }}
                      >
                        {loading && (
                          <CircularProgress />
                        )}
                        {loading && <span>Signing in</span>}
                        {!loading && <span>Sign in</span>}
                        {this.handleRedirect()}
                      </Button>
                    )}
                  </SnackBarContext.Consumer>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(LoginStyle)(Login);
