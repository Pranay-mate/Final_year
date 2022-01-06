import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Typography, Paper, Radio, RadioGroup, FormLabel, Grid, Backdrop } from '@material-ui/core';
import { getScore } from '../redux/dashboard/dashboardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pdf from './pdf.js'
import axios from 'axios';
import { saveAs } from 'file-saver';
import Download from '@material-ui/icons/CloudDownload';


class Home extends Component {

  state = {
    name: 1,
    receiptId: 0,
    price1: 0,
    price2: 0,
  };

  createAndDownloadPdf = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    
    const userId = user.result._id;
    axios.post('http://localhost:5000/create-pdf', {'userId':userId})
      .then(() => axios.get('http://localhost:5000/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        // console.log(res)
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }

  componentDidMount(){
    this.props.getScore();
  }
  

  handleTextChange = event => {
      const {target: {name, value}} = event;
      this.setState({ [name]: value });
  }


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  pdf = () => {
    this.props.postPdf()
  }
 
  render(){
    const pdfData = this.props.Score.dashboard[0];
    console.log(this.props.Score.dashboard[0])
    console.log(pdfData)
        return(
          <div className="form-container" id="dashboard">
             <Grid container spacing={3}>
                <Grid item xs={3} md={9}>
                  <h1>Dashboard</h1>
                </Grid>
                <Grid item xs={5} md={2} className='prog'>
                  {/* <h1 className="float-right pl-2" style={{fontSize: "2.5em"}}>{score}%</h1> */}
                  <div className="pdfDownload">
                    <Button variant="contained" color="primary" startIcon={<Download />} onClick={this.createAndDownloadPdf} >Download</Button>
                  </div>
                </Grid>
                <Grid item xs={5} md={1} className=''>
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
              { pdfData ? <Pdf pdfData= {pdfData}></Pdf> : null}
              </div>
          </div>
        );
    }
}
const mapStateToProps  = (state) => ({Score:state.score});
export default connect(mapStateToProps  , { getScore })(Home);