import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCertificate, updateCertificate, getCertificate, deleteCertificate } from '../redux/certificate/certificateActions.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import Moment from 'moment';

import Divider from '@material-ui/core/Divider';

import Backdrop from '@material-ui/core/Backdrop';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';

import $ from 'jquery';


class Certificates extends Component {

   
    state = {
      newCertificate: [],
      formState: 'ADD',
    };
    componentDidMount(){
      this.props.getCertificate()
      this.setState({certificates: this.props.Certificate});
    }
    

    handleTextChange = event => {

      const user = JSON.parse(localStorage.getItem('profile'))
      const {target: {name, value}} = event;
      this.setState({ [name]: value, _id: user.result._id });

      if(this.state.formState == 'UPDATE'){
        this.setState({ newCertificate:{...this.state.newCertificate, [name]: value, userID: user.result._id,  CertiName: this.state.CertiName,  Description: this.state.Description, SDate: this.state.SDate, EDate: this.state.EDate}, [name]: value});
        console.log('update');
      }else{
        this.setState({ newCertificate:{...this.state.newCertificate, [name]: value, userID: user.result._id }, [name]: value});
      }
  
      console.log(this.state.newCertificate)
    };

    handleOnSubmit = event => {
      event.preventDefault();
      
      const certificateID = $(".form_container.certificate").attr('id');
      if (typeof(certificateID) != 'undefined' && certificateID != '') {
       this.props.updateCertificate(this.state.newCertificate);
      }else{
       this.props.addCertificate(this.state.newCertificate);
      }
      this.props.getCertificate();
      this.loader();
      console.log(this.state)
  
    }

    checkboxClick = event => {
      this.setState({ [event.target.name]: event.target.checked });
      const currDate = Moment().format('DD-MM-YYYY');
      if(event.target.checked){
        this.setState({ newCertificate:{ EDate: currDate }, });
      }
      console.log(this.state)
    };

    editCertificate = (_certificate) => {
      this.setState({certificateID: _certificate._id, CertiName: _certificate.CertiName,  Description: _certificate.Description, SDate: _certificate.SDate, EDate: _certificate.EDate }); //for add language in input

      this.setState({ newCertificate:{ certificateID: _certificate._id} });
      this.setState({formState: "UPDATE"});

      console.log(this.state.newCertificate)
    };

    deleteCertificate = (_id) => {
      this.setState({ deleteCertificate: _id });

      this.props.deleteCertificate(_id);
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
         
        return(
            <div className="form-container">
              <Backdrop className='' open={this.state.isLoading} style={{ 'z-index': "1201"}} >
                <CircularProgress color="inherit" />
              </Backdrop>
              <Paper className='paper'>
              <h3>{this.state.formState} CERTIFICATE</h3>

                <form autoComplete="off" noValidate className='fomr form_container certificate' onSubmit={this.handleOnSubmit} id={this.state.certificateID}>
                <Typography variant="h6"></Typography>
                <TextField InputLabelProps={{ shrink: true }} InputLabelProps={{ shrink: true }} name="CertiName" variant="outlined" label="Certicates Name" fullWidth margin="dense" value={this.state.CertiName}  onChange={this.handleTextChange} />
                <TextField InputLabelProps={{ shrink: true }} name="SDate" variant="outlined" label="Start Date" type="date" fullWidth margin="dense" value={this.state.SDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />
                <TextField InputLabelProps={{ shrink: true }} name="EDate" variant="outlined" label="End Date" type="date" fullWidth margin="dense" value={this.state.EDate}  onChange={this.handleTextChange} InputLabelProps={{shrink: true, }} />
                <TextField InputLabelProps={{ shrink: true }} name="Description" variant="outlined" label="Description" fullWidth margin="dense" onChange={this.handleTextChange} value={this.state.Description} />
                <Divider />
                <Button startIcon={<SaveIcon />}  className='buttonSubmit' variant="contained" size="medium" type="submit" fullWidth>Submit</Button>

                </form>

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
                  {certificates.map(
                        (certificate,i) =>
                        <tr>
                          <th scope={certificate.id}>{++i}</th>
                          <td>{certificate.CertiName}</td>
                          <td>{certificate.Description}</td>
                          <td>{certificate.SDate}</td>
                          <td>{certificate.EDate}</td>
                          <td>
                          <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={()=> this.editCertificate(certificate)} >Edit</Button>
                          </td>
                          <td>
                          <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={()=>this.deleteCertificate(certificate._id)} >Delete</Button>
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

const mapStateToProps  = (state) => ({Certificate:state.certificates});
export default connect(mapStateToProps,{ getCertificate, addCertificate, updateCertificate, deleteCertificate })(Certificates);