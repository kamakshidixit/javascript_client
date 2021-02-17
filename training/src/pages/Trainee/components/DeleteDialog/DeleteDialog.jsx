/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  Button, Dialog, DialogActions, DialogContentText, DialogTitle,
  CircularProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { SnackBarContext } from '../../../../contexts/index';
import callApi from '../../../../libs/utils/api';

const useStyles = () => ({
  buttonColor: {
    backgroundColor: 'blue',
    color: 'white',
  },
});

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value }, () => console.log(this.state));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onDeleteHandler = async (data, openSnackBar) => {
    this.setState({
      loading: true,
    });
    console.log('efe222--', data.data);
    const { onSubmit } = this.props;
    const { originalId } = data.data;
    console.log('32323--', originalId);
    const response = await callApi({ }, 'delete', `user/${originalId}`);
    console.log('444--', response);
    this.setState({ loading: false });
    if (response && response.status === 'ok') {
      this.setState({
        message: 'Trainee Deleted Successfully ',
      }, () => {
        const { message } = this.state;
        onSubmit(data);
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        message: 'Error While Deleting Trainee',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  render() {
    const {
      classes, open, onClose, data,
    } = this.props;
    const { loading } = this.state;

    return (
      <Dialog
        open={open}
        onClose={() => this.handleClose()}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
        <DialogContentText style={{ marginLeft: 25 }}>
          Do you really want to remove the trainee?
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <SnackBarContext.Consumer>
              {({ openSnackBar }) => (
                <Button
                  className={classes.buttonColor}
                  variant="contained"
                  onClick={() => {
                    this.onDeleteHandler({ data }, openSnackBar);
                  }}
                >
                  {loading && (
                    <CircularProgress size={15} />
                  )}
                  {loading && <span>Deleting</span>}
                  {!loading && <span>Delete</span>}
                </Button>
              )}
            </SnackBarContext.Consumer>
          </DialogActions>
        </DialogContentText>
      </Dialog>
    );
  }
}

DeleteDialog.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(DeleteDialog);
