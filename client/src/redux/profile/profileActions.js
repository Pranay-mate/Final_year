import {GET_PROFILE, ADD_PROFILE, UPDATE_PROFILE, PROFILE_ERROR, DELETE_PROFILE} from './profileTypes.js'
import axios from 'axios'
import { PROJECTS_ERROR } from '../project/projectTypes.js';

export const getProfile = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.get(`http://localhost:5000/profile/`+userId)
        //console.log(res.data);
        dispatch( {
            type: GET_PROFILE,
            payload: res.data
        })

    }
    catch(e){
        dispatch( { 
            type: PROFILE_ERROR,
            payload: console.log(e),
        })
    }

}
export const addProfile = userobj => async dispatch => {
    
    try{
        console.log(userobj)
        const res = await axios.post(`http://localhost:5000/profile`, userobj)
        dispatch( {
            type: ADD_PROFILE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: PROFILE_ERROR,
            payload: console.log(e),
        })
    }

}

export const deleteProfile = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.delete(`http://localhost:5000/profile/`+userId)
        dispatch( {
            type: DELETE_PROFILE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: PROJECTS_ERROR,
            payload: console.log(e),
        })
    }

}

export const updateProfile = data => async dispatch => {
    try{
        const res = await axios.put(`http://localhost:5000/profile/605a21a8678e49540c9cce3f`, data)
        dispatch( {
            type: UPDATE_PROFILE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: PROFILE_ERROR,
            payload: console.log(e),
        })
    }

}