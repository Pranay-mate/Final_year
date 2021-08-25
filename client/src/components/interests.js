import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInterests, addInterests, updateInterest, deleteInterest } from '../redux/interest/interestActions.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';

import Backdrop from '@material-ui/core/Backdrop';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import $ from 'jquery';

class Interests extends Component {
  state = {
    newInterest: [],
    formState: 'ADD'
  };
  componentDidMount(){
    this.props.getInterests();
    this.setState({
      interests: this.props.Interests
    });
  }
  handleTextChange = event => {

    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('profile'))
    const {target: {name, value}} = event;
    this.setState({interest: event.target.value})

    if(this.state.formState == 'UPDATE'){
      this.setState({ newInterest:{[name]: value, userID: user.result._id, interestID: this.state.interestID }});
    }else{
      this.setState({ newInterest:{[name]: value, userID: user.result._id }});
    }

    console.log(this.state)
  }

  handleOnSubmit = event => {
    event.preventDefault();
    const interestID = $(".form_container.interest").attr('id');
    if (typeof(interestID) != 'undefined' && interestID != '') {
     this.props.updateInterest(this.state.newInterest);
    }else{
     this.props.addInterests(this.state.newInterest);
    }
    this.props.getInterests();
    this.loader();
    console.log(this.state)
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  editInterest = (_id,_interest) => {
    this.setState({interestID: _id }); //for add ID in html
    this.setState({ interest: _interest }); //for add interest in input
    

    this.setState({ newInterest:{interestID: _id} });
    this.setState({formState: "UPDATE"});
  };

  deleteInterest = (_id) => {
    this.setState({ deleteInterest: _id });
    this.props.deleteInterest(_id);
    this.setState({open: false});

    this.loader();
  };
  

  loader = () => {
    this.setState({isLoading: true});
    setInterval(() => {
    window.location.reload(); 
    this.setState({isLoading: false});
    }, 1000);
  }
 
    render(){
      const {interests} = this.props.Interests;

        return(
          <div className="form-container">
              <Backdrop className='' open={this.state.isLoading} style={{ 'z-index': "1201"}} >
                <CircularProgress color="inherit" />
              </Backdrop>
            <Paper className='paper'>
            <h3>{this.state.formState} INTEREST</h3>
            <form autoComplete="off" noValidate className='fomr form_container interest' id={this.state.interestID} onSubmit={this.handleOnSubmit}>
              <Typography variant="h6"></Typography>
                <TextField InputLabelProps={{ shrink: true }} name="interest" variant="outlined" label="interest" fullWidth margin="dense" value={this.state.interest}  onChange={this.handleTextChange} />
                <Button  startIcon={<SaveIcon />} className='buttonSubmit' variant="contained" size="medium" type="submit" fullWidth>Submit</Button>
              <Divider />
            </form>
            {/* <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button> */}
            <table class="table mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Interest</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
              {interests.map(
                    (interest,i) =>
                    <tr>
                      <th scope={interest.id}>{++i}</th>
                      <td>{interest.interest}</td>
                      <td>
                      <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={()=>  this.editInterest(interest._id,interest.interest)} >Edit</Button>
                      </td>
                      <td>
                      <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={()=> this.deleteInterest(interest._id)} >Delete</Button>
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
const mapStateToProps  = (state) => ({Interests:state.interests});
export default connect(mapStateToProps, { getInterests, addInterests, updateInterest, deleteInterest })(Interests);