import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLanguage ,addLanguage , updateLanguage, deleteLanguage } from '../redux/language/languageActions.js';
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

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

class Languages extends Component {

    state = {
    };
    componentDidMount(){
      this.props.getLanguage()
    }
    handleTextChange = event => {
      console.log(event);
      const user = JSON.parse(localStorage.getItem('profile'));
      const {target: {name, value}} = event;
      this.setState({ [name]: value, _id: user.result._id });
    }

    handleOnSubmit = event => {
        event.preventDefault();
        console.log(this.state)
        this.props.addLanguage(this.state);
        this.setState({open: false});
        this.loader();
  
    }
    handleChange = event => {
      const user = JSON.parse(localStorage.getItem('profile'));
      const {target: {name, value}} = event;
      this.setState({ [name]: value, _id: user.result._id });
      console.log(this.state)
    };
    handleOpen = () => {
      this.setState({open: true});
    };
  
    handleClose = () => {
      this.setState({open: false});
    };
    deleteDetails = () => {
      this.props.deleteLanguage();
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
      console.log(this.props)
      const {languages} = this.props.Languages;
      console.log(languages)

      if (languages != null && languages != '') {
        var Language = (
          <>
          <React.Fragment>
            <Typography variant="h6"></Typography>
            <FormControl className='Language' style={{width: '8em'}}>
              <InputLabel id="demo-simple-select-helper-label">Language</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                name="Language"
                value={languages.Language}
                onChange={this.handleChange}
              >
                <MenuItem value={1}>English</MenuItem>
                <MenuItem value={2}>French</MenuItem>
                <MenuItem value={3}>Hindi</MenuItem>
                <MenuItem value={4}>Marathi</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="h6"></Typography>
            <FormControl className='Proficiency'>
              <InputLabel id="demo-simple-select-helper-label">Proficiency</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                name="Proficiency"
                value={languages.Proficiency}
                onChange={this.handleChange}
              >
                <MenuItem value={1}>Elementry Proficiency</MenuItem>
                <MenuItem value={2}>Limited Working Proficiency</MenuItem>
                <MenuItem value={3}>Full Professional Proficiency</MenuItem>
                <MenuItem value={4}>Professional Working Proficiency</MenuItem>
                <MenuItem value={5}>Native or bilingual Proficiency</MenuItem>
              </Select>
              <FormHelperText>Language Proficiency</FormHelperText>
            </FormControl>
            <Divider />
            </React.Fragment>
          </>
          );
      }else{
      var Language = (
        <>
          <Typography variant="h6"></Typography>
          <FormControl className='Language' style={{width: '8em'}}>
            <InputLabel id="demo-simple-select-helper-label">Language</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="Language"
              value={this.state.Language}
              onChange={this.handleChange}
            >
              <MenuItem value={1}>English</MenuItem>
              <MenuItem value={2}>French</MenuItem>
              <MenuItem value={3}>Hindi</MenuItem>
              <MenuItem value={4}>Marathi</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6"></Typography>
          <FormControl className='Proficiency'>
            <InputLabel id="demo-simple-select-helper-label">Proficiency</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="Proficiency"
              value={this.state.Proficiency}
              onChange={this.handleChange}
            >
              <MenuItem value={1}>Elementry Proficiency</MenuItem>
              <MenuItem value={2}>Limited Working Proficiency</MenuItem>
              <MenuItem value={3}>Full Professional Proficiency</MenuItem>
              <MenuItem value={4}>Professional Working Proficiency</MenuItem>
              <MenuItem value={5}>Native or bilingual Proficiency</MenuItem>
            </Select>
            <FormHelperText>Language Proficiency</FormHelperText>
          </FormControl>
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
                {Language}
                    {/* <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button> */}
                </Paper>
                </form>

            </div>
        );
    }
}

const mapStateToProps  = (state) => ({Languages:state.language});
export default connect(mapStateToProps, { getLanguage, addLanguage, updateLanguage,deleteLanguage })(Languages);