import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProjects, updateProjects, getProjects, deleteProjects } from '../redux/project/projectActions.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import Moment from 'moment';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Backdrop from '@material-ui/core/Backdrop';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery';


class Projects extends Component {

  state = {
    newProject: [],
    formState: 'ADD',
  };
  componentDidMount(){
    this.props.getProjects()
    this.setState({projects: this.props.Project});

    this.setState({isLoading: false})
  }

  handleTextChange = event => {
    const user = JSON.parse(localStorage.getItem('profile'))
      const {target: {name, value}} = event;
      this.setState({ [name]: value, _id: user.result._id });

      if(this.state.formState == 'UPDATE'){
        this.setState({ newProject:{...this.state.newProject, [name]: value, userID: user.result._id,  ProjectName: this.state.ProjectName,  Description: this.state.Description, SDate: this.state.SDate, EDate: this.state.EDate}, [name]: value});
        console.log('update');
      }else{
        this.setState({ newProject:{...this.state.newProject, [name]: value, userID: user.result._id }, [name]: value});
      }
  
      console.log(this.state.newProject)
  }

  handleOnSubmit = event => {
    event.preventDefault();
    
    const projectID = $(".form_container.projects").attr('id');
    if (typeof(projectID) != 'undefined' && projectID != '') {
     this.props.updateProjects(this.state.newProject);
    }else{
     this.props.addProjects(this.state.newProject);
    }
    this.props.getProjects();
    this.loader();
    console.log(this.state)

  }

  checkboxClick = event => {
    this.setState({ [event.target.name]: event.target.checked });
    const currDate = Moment().format('DD-MM-YYYY');
    if(event.target.checked){
      this.setState({ newProject:{ EDate: currDate }, });
    }
    console.log(this.state)
  };

  editProject = (_project) => {
    this.setState({projectID: _project._id, ProjectName: _project.ProjectName,  Description: _project.Description, SDate: _project.SDate, EDate: _project.EDate }); //for add language in input

    this.setState({ newProject:{ projectID: _project._id} });
    this.setState({formState: "UPDATE"});

    console.log(this.state.newProject)
  };

  deleteProject = (_id) => {
    this.setState({ deleteProject: _id });

    this.props.deleteProjects(_id);
    this.loader();
  }
  loader = () => {
    this.setState({isLoading: true});
    setInterval(() => {
    window.location.reload(); 
    this.setState({isLoading: false});
    }, 2000);
  }
  
  
  render(){
    const {projects} = this.props.Project;
    console.log(projects);

      return(
          <div className="form-container">
              <Backdrop className='' open={this.state.isLoading} style={{ 'z-index': "1201"}} >
                <CircularProgress color="inherit" />
              </Backdrop>
              <Paper className='paper'>
              <h3>{this.state.formState} PROJECT</h3>

              <form autoComplete="off" noValidate className='fomr form_container projects' id={this.state.projectID} onSubmit={this.handleOnSubmit}>
                <Typography variant="h6"></Typography>
                <TextField InputLabelProps={{ shrink: true }} name="ProjectName" variant="outlined" label="Project Name" fullWidth margin="dense" value={this.state.ProjectName}  onChange={this.handleTextChange} />
                <TextField InputLabelProps={{ shrink: true }} name="SDate" variant="outlined" label="Start Date" type="date" fullWidth margin="dense" value={this.state.SDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />
                <FormControlLabel control={<Switch onChange={this.checkboxClick} name="PresetDate" color="primary" />} label="Present" />
                { !this.state.PresetDate ? <TextField InputLabelProps={{ shrink: true }} name="EDate" variant="outlined" label="End Date" type="date" fullWidth margin="dense" value={this.state.EDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />: null }
                <TextField InputLabelProps={{ shrink: true }} name="Description" variant="outlined" label="Description" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.Description} />
                <Divider />
                <Button className='buttonSubmit' startIcon={<SaveIcon />} variant="contained" size="medium" type="submit" fullWidth>Submit</Button>
              </form>

                {/* <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button> */}
                <table class="table mt-4">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Certificate Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                  {projects.map(
                        (project,i) =>
                        <tr>
                          <th scope={project.id}>{++i}</th>
                          <td>{project.ProjectName}</td>
                          <td>{project.Description}</td>
                          <td>{project.SDate}</td>
                          <td>{project.EDate}</td>
                          <td>
                            <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={()=>  this.editProject(project)} >Edit</Button>
                          </td>
                          <td>
                           <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={()=> this.deleteProject(project._id)} >Delete</Button>
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

const mapStateToProps  = (state) => ({Project:state.projects});
export default connect(mapStateToProps,{ getProjects, addProjects, updateProjects, deleteProjects })(Projects);