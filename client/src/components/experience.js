import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExperience, updateExperience, getExperience, deleteExperience } from '../redux/experience/experienceActions.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import {  withStyles } from '@material-ui/core';
import Moment from 'moment';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

class Experiences extends Component {

    state = {
    };
    componentDidMount(){
      this.props.getExperience()
      this.setState({isLoading: false});

    }

    handleTextChange = event => {
      const user = JSON.parse(localStorage.getItem('profile'))
      const {target: {name, value}} = event;
      this.setState({ [name]: value, _id: user.result._id });
    }

    handleOnSubmit = event => {
        event.preventDefault();
        this.props.addExperience(this.state);
        this.loader();
      //      this.props.updateProfile(this.state);
  
    }
    checkboxClick = event => {
      this.setState({ [event.target.name]: event.target.checked });
      const currDate = Moment().format('DD-MM-YYYY');
      if(event.target.checked){
        this.setState({EDate: currDate});
      }else{
        this.setState({EDate: undefined});
      }
      console.log(this.state)

    };
    handleOpen = () => {
      this.setState({open: true});
    };
  
    handleClose = () => {
      this.setState({open: false});
    };
    deleteDetails = () => {
      this.props.deleteExperience();
      this.setState({open: false});
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
      const {experiences} = this.props.Experience;
      console.log(experiences);

      if (experiences != null && experiences != '') {
        var experienceDiv = (
          <>
          <React.Fragment>
            <Typography variant="h6"></Typography>
            <TextField name="Title" variant="outlined" label="Title/Position" fullWidth margin="dense" value={experiences.Title}  onChange={this.handleTextChange} />
            <TextField name="Workplace" variant="outlined" label="Workplace/Company" fullWidth margin="dense" value={experiences.Workplace }  onChange={this.handleTextChange} />
            <TextField name="SDate" variant="outlined" label="Start Date" type="date" fullWidth margin="dense" value={experiences.SDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />
            <FormControlLabel control={<Switch  onChange={this.checkboxClick} name="PresetDate" checked={experiences.PresetDate} color="primary" />} label="Present" />
            { !experiences.PresetDate ? <TextField name="EDate" variant="outlined" label="End Date" type="date" fullWidth margin="dense" value={experiences.EDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />: null }
            <TextField name="WorkplaceAdd" variant="outlined" label="Workplace Address" fullWidth margin="dense" onChange={this.handleTextChange} value={experiences.WorkplaceAdd} />
            <TextField name="Achievements" variant="outlined" label="Accomplishment/Responsibility/Task" fullWidth margin="dense" onChange={this.handleTextChange} value={experiences.Achievements} />
            <TextField name="ContactInfo" variant="outlined" label="Contact Info" fullWidth margin="dense" onChange={this.handleTextChange} value={experiences.ContactInfo} />
            <Divider />
          </React.Fragment>
          </>
        );
      }else{
        var experienceDiv = (
          <>
            <Typography variant="h6"></Typography>
            <TextField name="Title" variant="outlined" label="Title/Position" fullWidth margin="dense" value={this.state.Program}  onChange={this.handleTextChange} />
            <TextField name="Workplace" variant="outlined" label="Workplace/Company" fullWidth margin="dense" value={this.state.Institude }  onChange={this.handleTextChange} />
            <TextField name="SDate" variant="outlined" label="Start Date" type="date" fullWidth margin="dense" value={this.state.SDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />
            <FormControlLabel control={<Switch onChange={this.checkboxClick} name="PresetDate" color="primary" />} label="Present" />
            { !this.state.PresetDate ? <TextField name="EDate" variant="outlined" label="End Date" type="date" fullWidth margin="dense" value={this.state.EDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />: null }
            <TextField name="WorkplaceAdd" variant="outlined" label="Workplace Address" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.WorkplaceAdd} />
            <TextField name="Achievements" variant="outlined" label="Accomplishment/Responsibility/Task" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.InstitudeAdd} />
            <TextField name="ContactInfo" variant="outlined" label="Contact Info" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.ContactInfo} />
            <Divider />
            <Button className='buttonSubmit' variant="contained" size="medium" type="submit" fullWidth>Submit</Button>
          </>
        );
      }

        return(
            <div className="form-container">
              <Button
                variant="contained"
                color="secondary"
                className='delete-modal-button'
                startIcon={<DeleteIcon />}
                onClick={this.handleOpen}
              >
                Delete
              </Button>
              <div>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className='delete-modal'
                  open={this.state.open}
                  onClose={this.state.handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={this.state.open}>
                      <div className='delete-div'>
                        <h3 id="transition-modal-title" className="delete-msg" >Are you sure you want to delete your certificate's details?</h3>
                        <Button
                          variant="contained"
                          color="secondary"
                          className='delete-button'
                          startIcon={<DeleteIcon />}
                          onClick={this.deleteDetails}
                        > Delete
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          className='cancel-button'
                          startIcon={<CancelIcon />}
                          onClick={this.handleClose}
                        >
                          Cancel
                        </Button>
                    </div>
                  </Fade>
                </Modal>
              </div>
              <Backdrop className='' open={this.state.isLoading} style={{ 'z-index': "1201"}} >
                <CircularProgress color="inherit" />
              </Backdrop>


                <form autoComplete="off" noValidate className='fomr' onSubmit={this.handleOnSubmit}>
                <Paper className='paper'>
                {experienceDiv}
                    {/* <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button> */}
                </Paper>
                </form>
            </div>
        );  
    }
}

const mapStateToProps  = (state) => ({Experience:state.experiences});
export default connect(mapStateToProps,{ getExperience ,addExperience , updateExperience, deleteExperience })(Experiences);