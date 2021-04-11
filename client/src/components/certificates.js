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

class Projects extends Component {

    state = {
      checkedA: true,
      checkedB: true

    };
    componentDidMount(){
      this.props.getProfile()
      
  }
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
      let menuItems = [];
      for (let i = 1; i <= 1; i++) {
        menuItems.push(
        <>
          <Typography variant="h6"></Typography>
          <TextField name="CertiName" variant="outlined" label="Certicates Name" fullWidth margin="dense" value={this.state.CertiName}  onChange={this.handleTextChange} />
          <TextField name="SDate" variant="outlined" label="Start Date" type="date" fullWidth margin="dense" value={this.state.SDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />
          <FormControlLabel control={<Switch checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" color="primary" />} label="Present" />
          <TextField name="EDate" variant="outlined" label="End Date" type="date" fullWidth margin="dense" value={this.state.EDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />
          <TextField name="Description" variant="outlined" label="Description" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.Description} />
          <Divider />
        </>
        );
         
       }
        return(
            <div className="form-container">
                <form autoComplete="off" noValidate className='fomr' onSubmit={this.handleOnSubmit}>
                <Paper className='paper'>
                {menuItems}
                <Button className='buttonSubmit' variant="contained" size="medium" type="submit" fullWidth>Submit</Button>
                    {/* <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button> */}
                </Paper>
                </form>

            </div>
        );
    }
}

export default connect(null, { addProfile, updateProfile })(Projects);