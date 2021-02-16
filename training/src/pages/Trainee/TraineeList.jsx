/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddDialog, DeleteDialog, EditDialog } from './components/index';
import trainees from './data/trainee';
import { TableComponent } from '../../components';
import { getDateFormatted } from '../../libs/utils/getDateFormatted';
import callApi from '../../libs/utils/api';

const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  dialog: {
    textAlign: 'right',
  },
});

class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      EditOpen: false,
      DeleteOpen: false,
      selected: '',
      orderBy: 'asc',
      order: '',
      page: 0,
      rowsPerPage: 10,
      editData: {},
      deleteData: {},
      count: 0,
      limit: 20,
      skip: 0,
      dataObj: []
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { open } = this.state;
    this.setState({ open: false });
    this.handleUpdateList();
    return open;
  };

  handleEditButton = (data) => {
    this.setState({ EditOpen: false }, () => { console.log('Edited Item ', data.data);
    this.handleUpdateList();
  });
  }

  handleDeleteButton = (data) => {
    this.setState({ DeleteOpen: false }, () => { console.log('Deleted Item ', data);
    this.handleUpdateList();
    const { page } = this.state;
    if ( page > 0 ){
      this.setState({ page: page - 1 })
    }
  });
  };

  handleSelect = (event, data) => {
    this.setState({ selected: event.target.value }, () =>
    console.log('Data', data));
  };

  handleSort = (field) => () => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  }

  handleSubmit = (data) => {
    this.setState({
      open: false,
    }, () => {
      console.log(data);
    });
  }

  handleEditDialogOpen = (data) => {
    this.setState({ EditOpen: true, editData: data });
  }

  handleRemoveDialogOpen = (data) => {
    this.setState({ DeleteOpen: true, deleteData: data });
  }

  handleChangePage = (event, newPage) => {
    this.componentDidMount(newPage);
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };
  handleUpdateList = () => {
    const { limit, skip, dataObj } = this.state;
    this.setState({ loading: true });
    const value = this.context;
    console.log('TraineeList value', value);
    callApi({}, 'get', `user?skip=${skip}&limit=${limit}`).then((response) => {
      console.log('1213reses;;', response.data);
      if (response.data === undefined) {
        console.log('inside iff');
        this.setState({
          loading: false,
          message: 'This is an error while displaying Trainee',
        });
      } else {
        const records  = response.data;
        console.log('dataObj Response : ', records);
        this.setState({
          dataObj: records,
          loading: false,
          Count: response.totalCount
         });
        return response;
      }

    });
  }

  componentDidMount = () => {
    this.handleUpdateList();
  }

  render() {
    const {
      open, order, orderBy, EditOpen,
      page, rowsPerPage, editData, DeleteOpen, deleteData, loading, dataObj, Count,
    } = this.state;
    console.log('dtObj:', dataObj);
    const { match: { url }, classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <div className={classes.dialog}>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              ADD TRAINEELIST
            </Button>
          </div>
          <AddDialog open={open} onClose={this.handleClose} onSubmit={() => this.handleSubmit} />
          &nbsp;
          &nbsp;
          <EditDialog
            onClose={this.handleEditButton}
            open={EditOpen}
            onSubmit={this.handleEditButton}
            data={editData}
          />
          <DeleteDialog
            data={deleteData}
            onClose={this.handleDeleteButton}
            onSubmit={this.handleDeleteButton}
            open={DeleteOpen}
          />
          <TableComponent
            loader={loading}
            id="id"
            data={dataObj}
            column={
              [
                {
                  field: 'name',
                  lable: 'Name',
                },
                {
                  field: 'email',
                  lable: 'Email Address',
                  format: (value) => value && value.toUpperCase(),
                },
                {
                  field: 'createdAt',
                  lable: 'Date',
                  align: 'right',
                  format: getDateFormatted,
                },
              ]
            }
            actions={[
              {
                icon: <EditIcon />,
                handler: this.handleEditDialogOpen,
              },
              {
                icon: <DeleteIcon />,
                handler: this.handleRemoveDialogOpen,
              },
            ]}
            orderBy={orderBy}
            order={order}
            onSort={this.handleSort}
            onSelect={this.handleSelect}
            count={Count}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      </>
    );
  }
}
TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(TraineeList);
