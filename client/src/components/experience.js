import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExperience, updateExperience, getExperience, deleteExperience } from '../redux/experience/experienceActions.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import Moment from 'moment';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';

import Backdrop from '@material-ui/core/Backdrop';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import $ from 'jquery';
import EditIcon from '@material-ui/icons/Edit';


class Experiences extends Component {

  state = {
    newExperience: [],
    formState: 'ADD',
  };
  componentDidMount(){
    this.props.getExperience()
    this.setState({experiences: this.props.Experience});

    this.setState({isLoading: false})
  }

  componentDidUpdate(prevProps){  
    if(typeof(prevProps.Experience.experiences.length) != 'undefined' && this.props.Experience.experiences.length  == 0){
      this.props.getExperience();
    }
  }

  loader = () => {
    this.setState({isLoading: true});
    setInterval(() => {
      if(this.state.formState == 'UPDATE'){
        this.setState({formState: "ADD"});
      }
      this.setState({isLoading: false});
      this.props.getExperience();
    }, 2000);
  }

  handleTextChange = event => {
    const user = JSON.parse(localStorage.getItem('profile'))
      const {target: {name, value}} = event;
      this.setState({ [name]: value, _id: user.result._id });

      if(this.state.formState == 'UPDATE'){
        this.setState({ newExperience:{...this.state.newExperience, [name]: value, userID: user.result._id,  ProjectName: this.state.ProjectName,  Description: this.state.Description, SDate: this.state.SDate, EDate: this.state.EDate}, [name]: value});
        console.log('update');
      }else{
        this.setState({ newExperience:{...this.state.newExperience, [name]: value, userID: user.result._id }, [name]: value});
      }
  
  }

  handleOnSubmit = event => {
    event.preventDefault();
    
    const experienceID = $(".form_container.experience").attr('id');
    if (typeof(experienceID) != 'undefined' && experienceID != '') {
     this.props.updateExperience(this.state.newExperience);
    }else{
     this.props.addExperience(this.state.newExperience);
    }
    this.props.getExperience();
    this.loader();

    this.setState({experienceID: null, Title: '',  Workplace: '', SDate: '', EDate: '', WorkplaceAdd: '' , Achievements: '', ContactInfo: '' }); //for add language in input

  }

  checkboxClick = event => {
    this.setState({ [event.target.name]: event.target.checked });
    const currDate = Moment().format('DD-MM-YYYY');
    if(event.target.checked){
      this.setState({ newExperience:{ EDate: currDate }, });
    }
  };

  editExperience = (_experience) => {
    
    this.setState({experienceID: _experience._id, Title: _experience.Title,  Workplace: _experience.Workplace, SDate: _experience.SDate, EDate: _experience.EDate, WorkplaceAdd: _experience.WorkplaceAdd , Achievements: _experience.Achievements, ContactInfo: _experience.ContactInfo }); //for add language in input

    this.setState({ newExperience:{ experienceID: _experience._id} });
    
    this.setState({formState: "UPDATE"});
  };

    deleteExperience = (_id) => {
     this.setState({ deleteExperience: _id });
      this.props.deleteExperience(_id);

      this.loader();
    }
    
    render(){
      const {experiences} = this.props.Experience;
      console.log(experiences);

        return(
            <div className="form-container">
                <Backdrop className='' open={this.state.isLoading} style={{ 'z-index': "1201"}} >
                  <CircularProgress color="inherit" />
                </Backdrop>
                <Paper className='paper'>
               <h3>{this.state.experienceID != null ? 'UPDATE': 'ADD'} EXPERIENCE</h3>

                <form autoComplete="off" noValidate className='fomr form_container experience' id={this.state.experienceID} onSubmit={this.handleOnSubmit}>
                  <Typography variant="h6"></Typography>
                  <TextField InputLabelProps={{ shrink: true }} name="Title" variant="outlined" label="Title/Position" fullWidth margin="dense" value={this.state.Title}  onChange={this.handleTextChange} />
                  <TextField InputLabelProps={{ shrink: true }} name="Workplace" variant="outlined" label="Workplace/Company" fullWidth margin="dense" value={this.state.Workplace }  onChange={this.handleTextChange} />
                  <TextField InputLabelProps={{ shrink: true }} name="SDate" variant="outlined" label="Start Date" type="date" fullWidth margin="dense" value={this.state.SDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />
                  <FormControlLabel control={<Switch onChange={this.checkboxClick} name="PresetDate" color="primary" />} label="Present" />
                  { !this.state.PresetDate ? <TextField InputLabelProps={{ shrink: true }} name="EDate" variant="outlined" label="End Date" type="date" fullWidth margin="dense" value={this.state.EDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />: null }
                  <TextField InputLabelProps={{ shrink: true }} name="WorkplaceAdd" variant="outlined" label="Workplace Address" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.WorkplaceAdd} />
                  <TextField InputLabelProps={{ shrink: true }} name="Achievements" variant="outlined" label="Accomplishment/Responsibility/Task" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.Achievements} />
                  <TextField InputLabelProps={{ shrink: true }} name="ContactInfo" variant="outlined" label="Contact Info" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.ContactInfo} />
                  <Divider />
                  <Button  startIcon={<SaveIcon />} className='buttonSubmit' variant="contained" size="medium" type="submit" fullWidth>Submit</Button>
                </form>

                    {/* <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button> */}
                    <table class="table mt-4">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Position</th>
                        <th scope="col">Workplace</th>
                        <th scope="col">Contact Info</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    {experiences.map(
                          (experience,i) =>
                          <tr>
                            <th scope={experience.id}>{++i}</th>
                            <td>{experience.Title}</td>
                            <td>{experience.Workplace}</td>
                            <td>{experience.ContactInfo}</td>
                            <td>
                              <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={()=> this.editExperience(experience)} >Edit</Button>
                            </td>
                            <td>
                              <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={()=> this.deleteExperience(experience._id)} >Delete</Button>
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

const mapStateToProps  = (state) => ({Experience:state.experiences});
export default connect(mapStateToProps,{ getExperience ,addExperience , updateExperience, deleteExperience })(Experiences);