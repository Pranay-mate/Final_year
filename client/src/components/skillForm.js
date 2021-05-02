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

    function SkillForm(props) {
        return (
            <form autoComplete="off" noValidate className='fomr'>
            <Paper className='paper'>
            {props.skill.map(u => 
                    <React.Fragment key={u.id}>
                        <Typography variant="h6"></Typography>
                          <TextField name="skill-1" variant="outlined" label="skill" fullWidth margin="dense" value={u.skill}  />
                    </React.Fragment>
              )}
            <TextField name="skill-2" variant="outlined" label="skill" fullWidth margin="dense"  />
           
             <Divider />

            <Button className='buttonSubmit' variant="contained" size="medium" type="submit" fullWidth>Submit</Button>
                {/* <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button> */}
            </Paper>
            </form>
        );
      }

export default connect(null, { addProfile, updateProfile })(SkillForm);