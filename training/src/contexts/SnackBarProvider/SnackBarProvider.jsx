/* eslint-disable react/jsx-no-undef */
import React from 'react';
import propTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const SnackBarContext = React.createContext();

class SnackBarProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      status: '',
      open: false,
    };
  }

  handleSnackBar = (message, status) => {
    this.setState({
      message,
      status,
      open: true,
    });
  }

  handleCloseSnackBar = (message) => {
    this.setState({
      message,
      open: false,
    });
  }

  render() {
    const { children } = this.props;
    const { message, status, open } = this.state;
    return (
      <>
        <SnackBarContext.Provider
          value={{
            state: { message, status, open },
            openSnackBar: this.handleSnackBar,
            closeSnackBar: this.handleCloseSnackBar,
          }}
        >
          {children}
          <CustomizedSnackbars />
        </SnackBarContext.Provider>
      </>
    );
  }
}
// eslint-disable-next-line react/jsx-props-no-spreading
const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const CustomizedSnackbars = () => {
  const value = React.useContext(SnackBarContext);
  const { closeSnackBar, state } = value;
  const {
    open, message, status,
  } = state;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackBar();
  };
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {status === 'success' ? (
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        )
          : <Alert onClose={handleClose} severity="error">{message}</Alert>}
      </Snackbar>
    </div>
  );
};

SnackBarProvider.propTypes = {
  children: propTypes.element.isRequired,
};

export { SnackBarContext, SnackBarProvider };
