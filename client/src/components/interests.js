import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInterests, addInterests, updateInterest, deleteInterest } from '../redux/interest/interestActions.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import {  withStyles } from '@material-ui/core';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

class Interests extends Component {

  state = {
  };
  componentDidMount(){
    this.props.getInterests()
  }
  handleTextChange = event => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const {target: {name, value}} = event;
    this.setState({ [name]: value, _id: user.result._id });
  }

  handleOnSubmit = event => {
      event.preventDefault();
      this.props.addInterests(this.state);
      this.setState({open: false});
      this.loader();
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  deleteDetails = () => {
    this.props.deleteInterest();
    this.setState({open: false});
    this.loader();
  }
  loader = () => {
    this.setState({isLoading: true});
    setInterval(() => {
    window.location.reload(); 
    this.setState({isLoading: false});
    }, 2000);
  }

 
    render(){
      const {interests} = this.props.Interests;
      console.log(interests)

      if (interests != null && interests != '') {
        var skillsInputs =(
          <>
           <React.Fragment>
           <Typography variant="h6"></Typography>
               <TextField name="Interest" variant="outlined" label="Interest" fullWidth margin="dense" value={interests.Interest}  onChange={this.handleTextChange} />
            <Divider />
           </React.Fragment>
           
          </>
        );
      }else{
        var skillsInputs =(
          <>
            <Typography variant="h6"></Typography>
               <TextField name="Interest" variant="outlined" label="Interest" fullWidth margin="dense" value={this.state.Interest}  onChange={this.handleTextChange} />
               <Button className='buttonSubmit' variant="contained" size="medium" type="submit" fullWidth>Submit</Button>
            <Divider />
          </>
        );
      }

        return(
          <div className="form-container">
            <Button
                variant="contained"
                color="secondary"
                className='delete-modal-button'
                startIcon={<DeleteIcon />}
                onClick={this.handleOpen}
              >
                Delete
              </Button>
              <div>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className='delete-modal'
                  open={this.state.open}
                  onClose={this.state.handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={this.state.open}>
                      <div className='delete-div'>
                        <h3 id="transition-modal-title" className="delete-msg" >Are you sure you want to delete your certificate's details?</h3>
                        <Button
                          variant="contained"
                          color="secondary"
                          className='delete-button'
                          startIcon={<DeleteIcon />}
                          onClick={this.deleteDetails}
                        > Delete
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          className='cancel-button'
                          startIcon={<CancelIcon />}
                          onClick={this.handleClose}
                        >
                          Cancel
                        </Button>
                    </div>
                  </Fade>
                </Modal>
              </div>
              <Backdrop className='' open={this.state.isLoading} style={{ 'z-index': "1201"}} >
                <CircularProgress color="inherit" />
              </Backdrop>
            <form autoComplete="off" noValidate className='fomr' onSubmit={this.handleOnSubmit}>
            <Paper className='paper'>
            {skillsInputs}
            {/* <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button> */}
            </Paper>
            </form>

          </div>
        );
    }
}
const mapStateToProps  = (state) => ({Interests:state.interests});
export default connect(mapStateToProps, { getInterests, addInterests, updateInterest, deleteInterest })(Interests);