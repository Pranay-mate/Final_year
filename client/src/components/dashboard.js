import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Typography, Paper, Radio, RadioGroup, FormLabel, Grid, Backdrop } from '@material-ui/core';
import { getScore, getSkillsData } from '../redux/dashboard/dashboardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pdf from './pdf.js'
import axios from 'axios';
import { saveAs } from 'file-saver';
import Download from '@material-ui/icons/CloudDownload';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { ToastContainer, toast } from 'react-toastify';


class Home extends Component {

  state = {
    name: 1,
    receiptId: 0,
    price1: 0,
    price2: 0,
  };

  JobProfiles = [
    'Front-End Developer',
    'Back-End Developer',
    'Full Stack Developer',
    'Software tester',
    'DevOps Engineer',
    'System Administrator',
    'MERN Stack Developer',
    'MEAN Stack Developer',
    'UI/UX Engineer'
  ];
  createAndDownloadPdf = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    
    const userId = user.result._id;
    axios.post('https://sleepy-reaches-43026.herokuapp.com/create-pdf', {'userId':userId})
      .then(() => axios.get('https://sleepy-reaches-43026.herokuapp.com/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        // console.log(res)
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'Resume.pdf');
      })
  }

  componentDidMount(){
    this.props.getScore();
  }
  

  handleTextChange = event => {
      const {target: {name, value}} = event;
      this.setState({ [name]: value });
  }


  changeJobProfile = event => {
    console.log(event);
      const user = JSON.parse(localStorage.getItem('profile'));
      const {target: {name, value}} = event;
    const userId = user.result._id;
    console.log({profile: value,userId:userId} )
    this.setState({ jobProfileDetails:{profile: value,userId:userId} });
    console.log(this.state.jobProfileDetails)
    setTimeout(() => {
      this.props.getSkillsData(this.state.jobProfileDetails);
    }, 1000);

  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  pdf = () => {
    this.props.postPdf()
  }
 
  render(){
    const pdfData = this.props.Score.dashboard[0];
    let score = 0;
    console.log(this.props.Score.dashboard[0])
    console.log(pdfData)
  
        return(
          <div className="form-container" id="dashboard">
             <Grid container spacing={4}>
                <Grid item xs={2} md={10}>
                  <h1>Dashboard</h1>
                </Grid>
                <Grid item xs={2} md={2}>
                <FormControl className='JobProfile'>
                  <InputLabel id="demo-simple-select-helper-label">Job Profiles</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="JobProfile"
                    name="JobProfile"
                    value={this.state.JobProfile}
                    onChange={this.changeJobProfile}
                  >
                    <MenuItem value={1}>Front-End Developer</MenuItem>
                    <MenuItem value={2}>Back-End Developer</MenuItem>
                    <MenuItem value={3}>Full Stack Developer</MenuItem>
                    <MenuItem value={4}>Software tester</MenuItem>
                    <MenuItem value={5}>DevOps Engineer</MenuItem>
                    <MenuItem value={6}>System Administrator</MenuItem>
                    <MenuItem value={7}>MERN Stack Developer</MenuItem>
                    <MenuItem value={8}>MEAN Stack Developer</MenuItem>
                    <MenuItem value={9}>UI/UX Engineer</MenuItem>
                  </Select>
                  <FormHelperText>Interested Job Profles</FormHelperText>
                </FormControl>
                </Grid>

                <Grid item xs={4} md={2} className='prog'>
                  {/* <h1 className="float-right pl-2" style={{fontSize: "2.5em"}}>{score}%</h1> */}
                  <div className="pdfDownload">
                  { (typeof(pdfData) !== 'undefined' ) ? <Button variant="contained" color="primary" startIcon={<Download />} onClick={this.createAndDownloadPdf} >Download</Button> : null }
                    
                  </div>
                </Grid>
                <Grid item xs={4} md={1} className=''>
                {/* <CircularProgress variant="determinate" value={score} /> */}
                </Grid>
              </Grid>
           {/* <Button
                variant="contained"
                color="secondary"
                className='delete-modal-button'
                onClick={this.pdf}
              >
                PDF
              </Button> */}
              <div style={{marginTop: "1em"}}>
              { (typeof(pdfData) !== 'undefined' ) ? <Pdf pdfData= {pdfData}></Pdf> : null }
              </div>
          </div>
        );
    }
}
const mapStateToProps  = (state) => ({Score:state.score});
export default connect(mapStateToProps  , { getScore, getSkillsData })(Home);