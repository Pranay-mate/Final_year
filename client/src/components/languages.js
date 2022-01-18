import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLanguage ,addLanguage , updateLanguage, deleteLanguage } from '../redux/language/languageActions.js';
import {  Button, Typography, Paper } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';

import Select from '@material-ui/core/Select';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import Backdrop from '@material-ui/core/Backdrop';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';

import ConstData from './localData/constant'
import $ from 'jquery';


class Languages extends Component {

    state = {
     newLanguage: [],
     formState: 'ADD',
     Language: "",
     Proficiency: ""
    };

    componentDidMount(){
      this.props.getLanguage()
      this.setState({languages: this.props.Languages});
      this.setState({isLoading: false})

    }

    componentDidUpdate(prevProps){  
      if(typeof(prevProps.Languages.languages.length) != 'undefined' && this.props.Languages.languages.length  == 0){
        this.props.getLanguage();
      }
    }

    loader = () => {
      this.setState({isLoading: true});
      setInterval(() => {
        if(this.state.formState == 'UPDATE'){
          this.setState({formState: "ADD"});
        }
        this.setState({isLoading: false});
        this.props.getLanguage();
      }, 2000);
    }

    handleChange = event => {
      console.log(event);
      const user = JSON.parse(localStorage.getItem('profile'));
      const {target: {name, value}} = event;
      if(this.state.formState == 'UPDATE'){
        this.setState({ newLanguage:{[name]: value, userID: user.result._id, languageID: this.state.languageID }, [name]: value});
      }else{
        this.setState({ newLanguage:{...this.state.newLanguage, [name]: value, userID: user.result._id }, [name]: value});
      }
    };
  
    handleOnSubmit = event => {
      event.preventDefault();
      
      const languageID = $(".form_container.language").attr('id');
      if (typeof(languageID) != 'undefined' && languageID != '') {
       this.props.updateLanguage(this.state.newLanguage);
      }else{
       this.props.addLanguage(this.state.newLanguage);
      }
      this.props.getLanguage();
      this.loader();

      this.setState({languageID: null, Language: '',  Proficiency: '' }); //for add language in input
  
    }

    editLanguage = (_id,_language,_proficiency) => {
      this.setState({languageID: _id, Language: _language,  Proficiency: _proficiency }); //for add language in input

      this.setState({ newLanguage:{ languageID: _id} });
      this.setState({formState: "UPDATE"});
    };
   
    deleteLanguage = (_id) => {
      this.setState({ deleteLanguage: _id });
      this.props.deleteLanguage(_id);
      this.loader();
    }

    render(){
      console.log(this.props)
      const {languages} = this.props.Languages;
      const LocalLanguages = ConstData.[0];

      return(
            <div className="form-container">
              
              <Backdrop className='' open={this.state.isLoading} style={{ 'z-index': "1201"}} >
                <CircularProgress color="inherit" />
              </Backdrop>
                <Paper className='paper'>
                <h3>{this.state.languageID!=null ? 'UPDATE': 'ADD'} LANGUAGE</h3>
                
                <form autoComplete="off" noValidate className='fomr form_container language' id={this.state.languageID} onSubmit={this.handleOnSubmit}>
                <Typography variant="h6"></Typography>
                <FormControl className='Language' style={{width: '8em'}}>
                  <InputLabel id="demo-simple-select-helper-label">Language</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="language"
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
                    id="proficiency"
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
                <Button  startIcon={<SaveIcon />} className='buttonSubmit' variant="contained" size="medium" type="submit" fullWidth>Submit</Button>
                    {/* <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button> */}
                </form>
                <table class="table mt-4">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Language</th>
                      <th scope="col">Proficiency</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                  {languages.map(
                        (languages,i) =>
                        <tr>
                          <th scope={languages.id}>{++i}</th>
                          <td>{LocalLanguages.Languages.[languages.Language]}</td>
                          <td>{LocalLanguages.Proficiency.[languages.Proficiency]}</td>
                          <td>
                            <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={()=>  this.editLanguage(languages._id,languages.Language,languages.Proficiency)} >Edit</Button>
                          </td>
                          <td>
                           <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={()=>  this.deleteLanguage(languages._id)} >Delete</Button>
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

const mapStateToProps  = (state) => ({Languages:state.language});
export default connect(mapStateToProps, { getLanguage, addLanguage, updateLanguage,deleteLanguage })(Languages);