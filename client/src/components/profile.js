import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile, addProfile, updateProfile, deleteProfile } from '../redux/profile/profileActions.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import {  withStyles } from '@material-ui/core';


import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

class Profile extends Component {

    state = {};
    componentDidMount(){
        this.props.getProfile()
    }

    handleTextChange = event => {
        const user = JSON.parse(localStorage.getItem('profile'));
        const {target: {name, value}} = event;
        this.setState({ [name]: value, Creator: user.result.name, _id: user.result._id });
        console.log(this.state)
    }

    handleOnSubmit = event => {
        event.preventDefault();
        this.props.addProfile(this.state);
        this.loader();
      //this.props.updateProfile(this.state);
    }

    handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };
      deleteDetails = () => {
        this.props.deleteProfile();
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
        const {profiles} = this.props.Profile;
        console.log(profiles);
        if (profiles != null && profiles != '') {
            var profileDiv = (
                <>
                <React.Fragment>
                    <TextField name="Fname" variant="outlined" label="First Name" fullWidth margin="dense" value={profiles.Fname}  onChange={this.handleTextChange} />
                    <TextField name="Mname" variant="outlined" label="Middle Name" fullWidth margin="dense" value={profiles.Mname}  onChange={this.handleTextChange} />
                    <TextField name="Lname" variant="outlined" label="Last Name" fullWidth margin="dense" value={profiles.Lname}  onChange={this.handleTextChange} />
                    <TextField name="title" variant="outlined" label="Job Title" fullWidth margin="dense" onChange={this.handleTextChange} value={profiles.title} />
                    <TextField name="EmailId" variant="outlined" label="Email Id" fullWidth margin="dense" onChange={this.handleTextChange} value={profiles.EmailId} />
                    <TextField name="ContactNumber" variant="outlined" label="Contact Number" fullWidth margin="dense"  onChange={this.handleTextChange} value={profiles.ContactNumber} />
                    <TextField name="Address" variant="outlined" label="Address" fullWidth margin="dense"  onChange={this.handleTextChange}  value={profiles.Address} />
                </React.Fragment>
                </>
            );  
        }else{
            var profileDiv = (
                <>
                <TextField name="Fname" variant="outlined" label="First Name" fullWidth margin="dense" value={this.state.Fname}  onChange={this.handleTextChange} />
                    <TextField name="Mname" variant="outlined" label="Middle Name" fullWidth margin="dense" value={this.state.Mname}  onChange={this.handleTextChange} />
                    <TextField name="Lname" variant="outlined" label="Last Name" fullWidth margin="dense" value={this.state.Lname}  onChange={this.handleTextChange} />
                    <TextField name="title" variant="outlined" label="Job Title" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.JobTitle} />
                    <TextField name="EmailId" variant="outlined" label="Email Id" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.EmailId} />
                    <TextField name="ContactNumber" variant="outlined" label="Contact Number" fullWidth margin="dense"  onChange={this.handleTextChange} value={this.state.ContactNumber} />
                    <TextField name="Address" variant="outlined" label="Address" fullWidth margin="dense"  onChange={this.handleTextChange} value={this.state.Address} />
                    <Button className='buttonSubmit' variant="contained" size="medium" type="submit" fullWidth>Submit</Button>
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


                <Paper className='paper'>
                
                <form autoComplete="off" noValidate className='fomr' onSubmit={this.handleOnSubmit}>
                {profileDiv}
                {/* <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button> */}
                </form>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps  = (state) => ({Profile:state.profiles})

export default connect(mapStateToProps, { getProfile, addProfile, updateProfile, deleteProfile })(Profile);