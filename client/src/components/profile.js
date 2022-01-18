import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile, addProfile, updateProfile, deleteProfile } from '../redux/profile/profileActions.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';


import Backdrop from '@material-ui/core/Backdrop';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery';
import SaveIcon from '@material-ui/icons/Save';

class Profile extends Component {

  state = {
    newProfile: [],
    formState: 'ADD',
  };
  componentDidMount(){
    this.props.getProfile()
    this.setState({profiles: this.props.Profile});
    this.setState({isLoading: false})
  }
  
  componentDidUpdate(prevProps){  
    if(typeof(prevProps.Profile.profiles.length) != 'undefined' && this.props.Profile.profiles.length  == 0){
      this.props.getProfile();
    }
  }
  
  loader = () => {
    this.setState({isLoading: true});
    setInterval(() => {
      if(this.state.formState == 'UPDATE'){
        this.setState({formState: "ADD"});
      }
      this.setState({isLoading: false});
      this.props.getProfile();
    }, 2000);

  }

  handleTextChange = event => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem('profile'))
      const {target: {name, value}} = event;
      this.setState({ [name]: value, _id: user.result._id });

      if(this.state.formState == 'UPDATE'){
        this.setState({ newProfile:{...this.state.newProfile, [name]: value, userID: user.result._id,  Fname: this.state.Fname,  Mname: this.state.Mname, Lname: this.state.Lname, EmailId: this.state.EmailId, JobTitle: this.state.JobTitle, ContactNumber:this.state.ContactNumber, Address: this.state.Address}, [name]: value});
        console.log('update');
      }else{
        this.setState({ newProfile:{...this.state.newProfile, [name]: value, userID: user.result._id }, [name]: value});
      }
  }

  handleOnSubmit = event => {
    event.preventDefault();
    
    const profileID = $(".form_container.profile").attr('id');
    if (typeof(profileID) != 'undefined' && profileID != '') {
     this.props.updateProfile(this.state.newProfile);
    }else{
     this.props.addProfile(this.state.newProfile);
    }
    this.props.getProfile();
    this.loader();
    // console.log(this.state)

    this.setState({profileID: null, Fname: '',  Mname: '', Lname: '', EmailId: '', JobTitle: '', ContactNumber: '', Address: '' }); //for add language in input
  }

  editProfile = (_profile) => {
    this.setState({profileID: _profile._id, Fname: _profile.Fname,  Mname: _profile.Mname, Lname: _profile.Lname, EmailId: _profile.EmailId, JobTitle: _profile.JobTitle, ContactNumber: _profile.ContactNumber, Address: _profile.Address }); //for add language in input

    this.setState({ newProfile:{ profileID: _profile._id} });
    this.setState({formState: "UPDATE"});

  };

      deleteProfile = (_id) => {
        this.props.deleteProfile(_id);
        this.loader();
       
      }
  
   
    render(){
        const {profiles} = this.props.Profile;
        
        return(
            <div className="form-container">
              <Backdrop className='' open={this.state.isLoading} style={{ 'z-index': "1201"}} >
                <CircularProgress color="inherit" />
              </Backdrop>
                <Paper className='paper'>
                <h3>{this.state.profileID != null ? 'UPDATE' : 'ADD'} PROFILE</h3>
                <form autoComplete="off"  className='fomr form_container profile' id={this.state.profileID} onSubmit={this.handleOnSubmit} >
                    <TextField name="Fname" InputLabelProps={{ shrink: true }} variant="outlined" label="First Name" fullWidth margin="dense" value={this.state.Fname}  onChange={this.handleTextChange} />
                    <TextField name="Mname" InputLabelProps={{ shrink: true }} variant="outlined" label="Middle Name" fullWidth margin="dense" value={this.state.Mname}  onChange={this.handleTextChange} />
                    <TextField name="Lname" InputLabelProps={{ shrink: true }} variant="outlined" label="Last Name" fullWidth margin="dense" value={this.state.Lname}  onChange={this.handleTextChange} />
                    <TextField name="JobTitle" InputLabelProps={{ shrink: true }} variant="outlined" label="Job Title" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.JobTitle} />
                    <TextField name="EmailId" InputLabelProps={{ shrink: true }} variant="outlined" label="Email Id" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.EmailId} />
                    <TextField name="ContactNumber" InputLabelProps={{ shrink: true }} variant="outlined" label="Contact Number" fullWidth margin="dense"  onChange={this.handleTextChange} value={this.state.ContactNumber} />
                    <TextField name="Address" InputLabelProps={{ shrink: true }} variant="outlined" label="Address" fullWidth margin="dense"  onChange={this.handleTextChange} value={this.state.Address} />
                    <Button className='buttonSubmit' startIcon={<SaveIcon />} variant="contained" size="medium" type="submit" fullWidth>Submit</Button>
                </form>
                <table class="table mt-4">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Job Title</th>
                        <th scope="col">Email ID</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    {profiles.map(
                          (profile,i) =>
                          <tr>
                            <th scope={profile.id}>{++i}</th>
                            <td>{profile.Fname} {profile.Mname} {profile.Lname}</td>
                            <td>{profile.JobTitle}</td>
                            <td>{profile.EmailId}</td>
                            <td>{profile.ContactNumber}</td>
                            <td>
                            <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={()=> this.editProfile(profile)} >Edit</Button>
                            </td>
                            <td>
                            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={()=> this.deleteProfile(profile._id)} >Delete</Button>
                            </td>
                          </tr>
                            
                      )}
                    
                    </tbody>
                  </table>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps  = (state) => ({Profile:state.profiles})

export default connect(mapStateToProps, { getProfile, addProfile, updateProfile, deleteProfile })(Profile);