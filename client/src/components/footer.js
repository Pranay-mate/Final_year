import React, {Component} from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TextField, Button, Typography, Paper, Radio, RadioGroup, FormLabel, Grid, Backdrop, CircularProgress } from '@material-ui/core';
import LinkedIn from '@material-ui/icons/LinkedIn';
import Instagram from '@material-ui/icons/Instagram';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircleRounded';
import Mail from '@material-ui/icons/Mail';
// import Instagram from '@material-ui/icons/Instagram';

class Footer extends Component {

        constructor(props) {
          super(props)
        }
        
        render() {
        
          return (
            <div class="ui equal width center aligned padded grid footer" style={{height:'auto', backgroundColor:'black', color:'#878787'}}>
                <Grid container spacing={3}>
                    <Grid item xs={3} md={3} className="company-logo">
                        Interview Bot
                    </Grid>
                    <Grid item xs={5} md={6} className='copyright'>
                        <span className='copyright-span'><i class="copyright icon"></i>2021, All Rights Reserved by Pranay Mate</span>
                    </Grid>
                    <Grid item xs={4} md={3} className='icons'>
                        <a  href="https://pranay-mate.github.io/portfolio/">
                            <SupervisedUserCircle></SupervisedUserCircle>
                        </a>
                        <a  href="https://www.linkedin.com/in/pranay-mate-arvind/">
                            <LinkedIn></LinkedIn>
                        </a>
                        <a  href="https://www.instagram.com/pranay_mate/">
                            <Instagram></Instagram>
                        </a>
                        <a  href="mailto:matepranay11@gmail.com">
                          <Mail></Mail>
                        </a>
                    </Grid>
                </Grid>
            </div>

          );
        }
      }
export default Footer;