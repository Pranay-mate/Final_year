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
import Select from '@material-ui/core/Select';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

class Languages extends Component {

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
      let menuItems = [];
      for (let i = 1; i <= 1; i++) {
        menuItems.push(
        <>
          <Typography variant="h6"></Typography>
          <TextField name="ProjectName" variant="outlined" label="Language Name" fullWidth margin="dense" value={this.state.ProjectName}  onChange={this.handleTextChange} />
          <FormControl className=''>
            <InputLabel id="demo-simple-select-helper-label">Proficiency</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value=''
              onChange={this.handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Elementry Proficiency</MenuItem>
              <MenuItem value={20}>Limited Working Proficiency</MenuItem>
              <MenuItem value={30}>Full Professional Proficiency</MenuItem>
              <MenuItem value={40}>Professional Working Proficiency</MenuItem>
              <MenuItem value={50}>Native or bilingual Proficiency</MenuItem>
            </Select>
            <FormHelperText>Language Proficiency</FormHelperText>
          </FormControl>
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

export default connect(null, { addProfile, updateProfile })(Languages);