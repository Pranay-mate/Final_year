import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProfile, updateProfile } from '../redux/profile/profileActions.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import {  withStyles } from '@material-ui/core';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

class Home extends Component {

  state = {
    checkedA: true,
    checkedB: true

  };

  handleTextChange = event => {
      const {target: {name, value}} = event;
      this.setState({ [name]: value });
  }

  handleOnSubmit = event => {
      event.preventDefault();
      this.props.addProfile(this.state);
    //      this.props.updateProfile(this.state);

  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

 
    render(){
     
        return(
          <div className="form-container">
           <h1>HOME Component</h1>

          </div>
        );
    }
}

export default connect(null, { addProfile, updateProfile })(Home);