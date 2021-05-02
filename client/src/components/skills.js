import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSkills, addSkills, updateSkills } from '../redux/skill/skillActions.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import {  withStyles } from '@material-ui/core';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { $CombinedState } from 'redux';

class Skills extends Component {

  state = {};
  
  componentDidMount(){
      this.props.getSkills();
  }

  handleTextChange = event => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const {target: {name, value}} = event;
    if (this.props.Skills.skills.length == 0) {
      this.setState({ [name]: value, _id: user.result._id });
    }else{
      this.setState({ [name]: value });
    }
    console.log(value)
    console.log(this.state)


  }

  handleOnSubmit = event => {
      event.preventDefault();
      if (this.props.Skills.skills.length == 0) {
       this.props.addSkills(this.state);
      }else{
       this.props.updateSkills(this.state);
      }
      console.log(this.state)
      // this.props.updateProfile(this.state);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

 
    render(){
      const {skills} = this.props.Skills
      var skillsArray = [];
      console.log(skills)
      if (!Array.isArray(skills)) {
        var skillsArray = new Array;
        skillsArray.push(skills)
      }else{
        skillsArray = skills;
      }
      let skillsInputs = [];

        if (skills.length != 0) {
          skillsInputs.push(
            <>
              {skillsArray.map(u => 
                    <React.Fragment key={u.id}>
                        <Typography variant="h6"></Typography>
                          <TextField name="skill-1" variant="outlined" label="skill" fullWidth margin="dense" value={u.skill}  onChange={this.handleTextChange} />
                    </React.Fragment>
              )}
            
            </>
            );
        }
        

        return(
          <div className="form-container">
            <form autoComplete="off" noValidate className='fomr' onSubmit={this.handleOnSubmit}>
            <Paper className='paper'>
            {skillsInputs}
            <TextField name="skill-2" variant="outlined" label="skill" fullWidth margin="dense"  onChange={this.handleTextChange} />
           
             <Divider />

            <Button className='buttonSubmit' variant="contained" size="medium" type="submit" fullWidth>Submit</Button>
                {/* <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button> */}
            </Paper>
            </form>

          </div>
        );
}
}
const mapStateToProps  = (state) => ({Skills:state.skills})

export default connect(mapStateToProps, { getSkills, addSkills, updateSkills })(Skills);