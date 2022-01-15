import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSkills, addSkills, updateSkills, deleteSkills } from '../redux/skill/skillActions.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import $ from 'jquery';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

class Skills extends Component {
  state= {
    newSkill: [],
    formState: 'ADD'
  }
  componentDidMount(){  
    this.props.getSkills();
    this.setState({
      skills: this.props.Skills
    });
    console.log(this.state.formState)
  }

  componentDidUpdate(prevProps){  
    if(typeof(prevProps.Skills.skills.length) != 'undefined' && this.props.Skills.skills.length  == 0){
     this.props.getSkills();
    }
  }
  
  loader = () => {
    this.setState({isLoading: true});
    setInterval(() => {
      if(this.state.formState == 'UPDATE'){
        this.setState({formState: "ADD"});
      }
      this.setState({isLoading: false});
    }, 1000);
    console.log(this.state.formState)
  }

  handleTextChange = event => {
    event.preventDefault();
    this.setState({skill: event.target.value})
    const user = JSON.parse(localStorage.getItem('profile'))
    const {target: {name, value}} = event;

    if(this.state.formState == 'UPDATE'){
      this.setState({ newSkill:{[name]: value, userID: user.result._id, skillId: this.state.skillId }});
    }else{
      this.setState({ newSkill:{[name]: value, userID: user.result._id }});
    }
    console.log(this.state.formState)
  }

  editSkill = (_id,_skill) => {
    this.setState({skillId: _id }); //for add ID in html
    this.setState({ skill: _skill }); //for add skill in input

    this.setState({ newSkill:{skillId: _id} });
    this.setState({formState: "UPDATE"});
    console.log(this.state.formState)
  };

  deleteSkill = (_id) => {
    this.setState({ deleteSkill: _id });
    this.props.deleteSkills(_id);
    this.loader();
    console.log(this.state.formState)
  };


  handleOnSubmit = event => {
    event.preventDefault();
    const skillID = $(".form_container.skill").attr('id');
    if (typeof(skillID) != 'undefined' && skillID != '') {
     this.props.updateSkills(this.state.newSkill);
    }else{
     this.props.addSkills(this.state.newSkill);
    }
    //this.props.getSkills();
    this.loader();
    console.log(this.state)
    console.log(this.state.formState)

    this.setState({skillId: null }); //for rm ID in html
    this.setState({ skill: '' }); //for rm skill in input
  }
 
    render(){
       const {skills} = this.props.Skills;
       console.log(this.state.formState)


       return(
          <div className="form-container">
            <Paper className='paper'>
            <h3>{this.state.skillId != null ? 'UPDATE': 'ADD'} SKILL</h3>
            <form autoComplete="off" noValidate className='fomr' onSubmit={this.handleOnSubmit}>
            <div className='form_container skill' id={this.state.skillId}>
            <React.Fragment >
                <Typography variant="h6"></Typography>
                  <TextField InputLabelProps={{ shrink: true }} name="skill" id="skill" variant="outlined" label="skill" fullWidth margin="dense" value={this.state.skill}  onChange={this.handleTextChange} />
            </React.Fragment>
             <Divider />
            </div>

            <Button  startIcon={<SaveIcon />} className='btn btn-dark' variant="contained" size="medium" type="submit" fullWidth>Submit</Button>
            </form>

                {/* <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button> */}
                <table class="table mt-4">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Skill</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                  {skills.map(
                        (skill,i) =>
                        <tr>
                          <th scope={skill.id}>{++i}</th>
                          <td>{skill.skill}</td>
                          <td>
                           <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={()=> this.editSkill(skill._id,skill.skill)} >Edit</Button>
                          </td>
                          <td>
                           <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={()=> this.deleteSkill(skill._id)} >Delete</Button>
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
const mapStateToProps  = (state) => ({Skills:state.skills})

export default connect(mapStateToProps, { getSkills, addSkills, updateSkills, deleteSkills })(Skills);