import React, { Component } from 'react';
import { connect } from 'react-redux';
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
          <div className="form-container">
            <h1>Dashboard</h1>
           <span className="float-right">
            <CircularProgress variant="determinate" value={score} />
            <h1 className="float-right pl-2" style={{fontSize: "2.5em"}}>{score}%</h1>
           </span>
           {/* <Button
                variant="contained"
                color="secondary"
                className='delete-modal-button'
                onClick={this.pdf}
              >
                PDF
              </Button> */}
              <Pdf></Pdf>
          </div>
        );
    }
}
const mapStateToProps  = (state) => ({Score:state.score});
export default connect(mapStateToProps  , { getScore })(Home);