import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Typography, Paper, Radio, RadioGroup, FormLabel, Grid, Backdrop } from '@material-ui/core';
import { getScore } from '../redux/dashboard/dashboardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pdf from './pdf.js'

class Home extends Component {

  state = {

  };
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
    const score = this.props.Score.dashboard;
    console.log(this.props.Score.dashboard)
    console.log(score)
        return(
          <div className="form-container" id="dashboard">
             <Grid container spacing={3}>
                <Grid item xs={3} md={9}>
                  <h1>Dashboard</h1>
                </Grid>
                <Grid item xs={5} md={2} className='prog'>
                  <h1 className="float-right pl-2" style={{fontSize: "2.5em"}}>{score}%</h1>
                </Grid>
                <Grid item xs={5} md={1} className=''>
                <CircularProgress variant="determinate" value={score} />
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
                <Pdf></Pdf>
              </div>
          </div>
        );
    }
}
const mapStateToProps  = (state) => ({Score:state.score});
export default connect(mapStateToProps  , { getScore })(Home);