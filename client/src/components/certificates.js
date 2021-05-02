import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCertificate, updateCertificate, getCertificate, deleteCertificate } from '../redux/certificate/certificateActions.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
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

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';



import Loader from './loader.js'

    const useStyles = makeStyles(theme => ({
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
}));

class Certificates extends Component {

   
    state = {
      isLoading: true
    };
    componentDidMount(){
      this.props.getCertificate()
      this.setState({isLoading: false})
    }
    

    handleTextChange = event => {
      const user = JSON.parse(localStorage.getItem('profile'))
      const {target: {name, value}} = event;
      this.setState({ [name]: value, _id: user.result._id });
    }

    handleOnSubmit = event => {
        event.preventDefault();
        this.props.addCertificate(this.state);
        this.loader();
    }
    checkboxClick = event => {
      this.setState({ [event.target.name]: event.target.checked });
      const currDate = Moment().format('DD-MM-YYYY');
      if(event.target.checked){
        this.setState({
         EDate: currDate
        });
      }
    };
    handleOpen = () => {
      this.setState({open: true});
    };
  
    handleClose = () => {
      this.setState({open: false});
    };
    deleteDetails = () => {
      this.props.deleteCertificate();
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
      const loaderCss = {
        'z-index': "1201",
      };
      const {certificates} = this.props.Certificate;
      console.log(certificates);

      if (certificates != null && certificates != '') {
        var certificateDiv = (
          <>
          <React.Fragment>
            <Typography variant="h6"></Typography>
            <TextField name="CertiName" variant="outlined" label="Certicates Name" fullWidth margin="dense" value={certificates.CertiName}  onChange={this.handleTextChange} />
            <TextField name="SDate" variant="outlined" label="Start Date" type="date" fullWidth margin="dense" value={certificates.SDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />
            <FormControlLabel control={<Switch  onChange={this.checkboxClick} name="PresetDate" checked={certificates.PresetDate} color="primary" />} label="Present" />
             { !certificates.PresetDate ?<TextField name="EDate" variant="outlined" label="End Date" type="date" fullWidth margin="dense" value={certificates.EDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />: null }
            <TextField name="Description" variant="outlined" label="Description" fullWidth margin="dense" onChange={this.handleTextChange} value={certificates.Description} />
            <Divider />
            </React.Fragment>
          </>
        );
      }else{
        var certificateDiv = (
          <>
            <Typography variant="h6"></Typography>
            <TextField name="CertiName" variant="outlined" label="Certicates Name" fullWidth margin="dense" value={this.state.CertiName}  onChange={this.handleTextChange} />
            <TextField name="SDate" variant="outlined" label="Start Date" type="date" fullWidth margin="dense" value={this.state.SDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />
            <FormControlLabel control={<Switch onChange={this.checkboxClick} name="PresetDate" color="primary" />} label="Present" />
            { !this.state.PresetDate ?<TextField name="EDate" variant="outlined" label="End Date" type="date" fullWidth margin="dense" value={this.state.EDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />: null}
            <TextField name="Description" variant="outlined" label="Description" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.Description} />
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
                {certificateDiv}
                    {/* <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button> */}
                </Paper>
                </form>
            </div>
        );
    }
}

const mapStateToProps  = (state) => ({Certificate:state.certificates});
export default connect(mapStateToProps,{ getCertificate, addCertificate, updateCertificate, deleteCertificate })(Certificates);