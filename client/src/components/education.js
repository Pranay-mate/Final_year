import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEducation, updateEducation, getEducation, deleteEducation } from '../redux/education/educationActions';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import Moment from 'moment';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Backdrop from '@material-ui/core/Backdrop';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import $ from 'jquery';

class Education extends Component {

    state = {
      newEducation: [],
      formState: 'ADD',
    };
    componentDidMount(){
      this.props.getEducation()
      this.setState({educations: this.props.Education});
      this.setState({isLoading: false})
    }

    componentDidUpdate(prevProps){  
      if(typeof(prevProps.Education.educations.length) != 'undefined' && this.props.Education.educations.length  == 0){
        this.props.getEducation();
      }
    }

    loader = () => {
      this.setState({isLoading: true});
      setInterval(() => {
        if(this.state.formState == 'UPDATE'){
          this.setState({formState: "ADD"});
        }
        this.setState({isLoading: false});
        this.props.getEducation();
      }, 2000);
  
    }
  
    handleTextChange = event => {
      event.preventDefault();
      const user = JSON.parse(localStorage.getItem('profile'))
        const {target: {name, value}} = event;
        this.setState({ [name]: value, _id: user.result._id });
  
        if(this.state.formState == 'UPDATE'){
          this.setState({ newEducation:{...this.state.newEducation, [name]: value, userID: user.result._id,  Program: this.state.Program,  Institude: this.state.Institude, SDate: this.state.SDate, EDate: this.state.EDate, MarksObtained: this.state.MarksObtained}, [name]: value});
          console.log('update');
        }else{
          this.setState({ newEducation:{...this.state.newEducation, [name]: value, userID: user.result._id }, [name]: value});
        }
    }
  
    handleOnSubmit = event => {
      event.preventDefault();
      
      const educationID = $(".form_container.education").attr('id');
      if (typeof(educationID) != 'undefined' && educationID != '') {
       this.props.updateEducation(this.state.newEducation);
      }else{
       this.props.addEducation(this.state.newEducation);
      }
      this.props.getEducation();
      this.loader();

      this.setState({  educationID: null,  Program: '',  Institude: '', SDate: '', EDate: '', MarksObtained: ''});
    }
  
    checkboxClick = event => {
      this.setState({ [event.target.name]: event.target.checked });
      const currDate = Moment().format('DD-MM-YYYY');
      if(event.target.checked){
        this.setState({ newEducation:{ EDate: currDate }, });
      }
      console.log(this.state)
    };
  
    editEducation = (_education) => {
      this.setState({educationID: _education._id, Program: _education.Program,  Institude: _education.Institude, SDate: _education.SDate, EDate: _education.EDate, MarksObtained: _education.MarksObtained }); //for add language in input
  
      this.setState({ newEducation:{ educationID: _education._id} });
      this.setState({formState: "UPDATE"});
  
    };

    deleteEducation = (_id) => {
      this.props.deleteEducation(_id);
      this.loader();
    }
  
   
    render(){
      const {educations} = this.props.Education;
      console.log(educations)
        return(
            <div className="form-container">
              <Backdrop className='' open={this.state.isLoading} style={{ 'z-index': "1201"}} >
                <CircularProgress color="inherit" />
              </Backdrop>
                <Paper className='paper'>
                 <h3>{this.state.educationID != null ? 'UPDATE': "ADD"} EDUCATION</h3>

                  <form autoComplete="off" noValidate className='fomr form_container education' id={this.state.educationID} onSubmit={this.handleOnSubmit}>
                    <Typography variant="h6"></Typography>
                    <TextField InputLabelProps={{ shrink: true }} name="Program" variant="outlined" label="Study Program" fullWidth margin="dense" value={this.state.Program}  onChange={this.handleTextChange} />
                    <TextField InputLabelProps={{ shrink: true }} name="Institude" variant="outlined" label="Institude" fullWidth margin="dense" value={this.state.Institude }  onChange={this.handleTextChange} />
                    <TextField InputLabelProps={{ shrink: true }} name="SDate" variant="outlined" label="Start Date" type="date" fullWidth margin="dense" value={this.state.SDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />
                    <FormControlLabel control={<Switch onChange={this.checkboxClick} name="PresetDate" color="primary" />} label="Present" />
                    { !this.state.PresetDate ? <TextField InputLabelProps={{ shrink: true }} name="EDate" variant="outlined"  label="End Date" type="date" fullWidth margin="dense" value={this.state.EDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />: null }
                    <TextField InputLabelProps={{ shrink: true }} name="MarksObtained" variant="outlined" label="Marks Obtaied (Avg)" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.MarksObtained} />
                    <Button  startIcon={<SaveIcon />} className='buttonSubmit' variant="contained" size="medium" type="submit" fullWidth>Submit</Button>
                  </form>

                  <table class="table mt-4">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Program</th>
                        <th scope="col">Institude</th>
                        <th scope="col">Marks Obtaied (%)</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    {educations.map(
                          (education,i) =>
                          <tr>
                            <th scope={education.id}>{++i}</th>
                            <td>{education.Program}</td>
                            <td>{education.Institude}</td>
                            <td>{education.MarksObtained}</td>
                            <td>{education.SDate}</td>
                            <td>{education.EDate}</td>
                            <td>
                              <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={()=> this.editEducation(education)} >Edit</Button>
                            </td>
                            <td>
                             <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={()=> this.deleteEducation(education._id)} >Delete</Button>
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

const mapStateToProps  = (state) => ({Education:state.educations});
export default connect(mapStateToProps, { getEducation, addEducation, updateEducation, deleteEducation })(Education);