import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile, addProfile, updateProfile } from '../redux/profile/profileActions.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import {  withStyles } from '@material-ui/core';

class Profile extends Component {

    state = {};
    componentDidMount(){
        this.props.getProfile()
    }

    handleTextChange = event => {
        const user = JSON.parse(localStorage.getItem('profile'));
        const {target: {name, value}} = event;
        this.setState({ [name]: value, Creator: user.result.name, _id: user.result._id });

    }

    handleOnSubmit = event => {
        event.preventDefault();
        this.props.addProfile(this.state);
      //this.props.updateProfile(this.state);
    }
  
   
    render(){
        const {profiles} = this.props.Profile;
       // console.log(profiles);

        return(
            <div className="form-container">
                <Paper className='paper'>
                {/* <div>
                {profiles.map(u => 
                     <React.Fragment key={u._id}>
                         <h6 >{u._id}</h6>
                         <h6 >{u.Fname}</h6>
                         <h6 >{u.Lname}</h6> 
                         <h6 >{u.EmailId}</h6> 
                     </React.Fragment>
                )}
                </div> */}
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

const mapStateToProps  = (state) => ({Profile:state.profiles})

export default connect(mapStateToProps, { getProfile, addProfile, updateProfile })(Profile);