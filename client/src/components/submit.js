import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProfile } from '../redux/profile/profileActions.js';
import { updateProfile } from '../redux/profile/profileActions.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import {  withStyles } from '@material-ui/core';

class AddUser extends Component {

    state = {};

    handleTextChange = event => {
        const {target: {name, value}} = event;
        this.setState({ [name]: value });
    }

    handleOnSubmit = event => {
        event.preventDefault();
        this.props.addProfile(this.state);
      //      this.props.updateProfile(this.state);
  
    }
  
   
    render(){
        return(
            <div className="form-container">
              
                <Paper className='paper'>
                <form autoComplete="off" noValidate className='fomr' onSubmit={this.handleOnSubmit}>
                    <Typography variant="h6"></Typography>
                    <TextField name="Fname" variant="outlined" label="First Name" fullWidth margin="dense" value={this.state.Fname}  onChange={this.handleTextChange} />
                    <TextField name="Mname" variant="outlined" label="Middle Name" fullWidth margin="dense" value={this.state.Mname}  onChange={this.handleTextChange} />
                    <TextField name="Lname" variant="outlined" label="Last Name" fullWidth margin="dense" value={this.state.Lname}  onChange={this.handleTextChange} />
                    <TextField name="title" variant="outlined" label="Job Title" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.JobTitle} />
                    <TextField name="EmailId" variant="outlined" label="Email Id" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.EmailId} />
                    <TextField name="ContactNumber" variant="outlined" label="Contact Number" fullWidth margin="dense"  onChange={this.handleTextChange} value={this.state.ContactNumber} />
                    <TextField name="Address" variant="outlined" label="Address" fullWidth margin="dense"  onChange={this.handleTextChange} value={this.state.Address} />
                    <Button className='buttonSubmit' variant="contained" size="medium" type="submit" fullWidth>Submit</Button>
                    {/* <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button> */}
                </form>
                </Paper>
            </div>
        );
    }
}

export default connect(null, { addProfile, updateProfile })(addProfile);