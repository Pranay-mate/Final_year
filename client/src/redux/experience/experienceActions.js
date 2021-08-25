import {UPDATE_EXPERIENCE, GET_EXPERINCE, ADD_EXPERINCE, EXPERINCE_ERROR, DELETE_EXPERIENCE} from './experienceTypes.js'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

export const getExperience = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user == null){
        window.location.href = '/auth';
    }
    const userId = user.result._id;
    try{
        const res = await axios.get(`http://localhost:5000/experience/`+userId)
        console.log(res.data);
        dispatch( {
            type: GET_EXPERINCE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( { 
            type: EXPERINCE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }
}

export const addExperience = userobj => async dispatch => {
    console.log(userobj)
    try{
        console.log(userobj)
        const res = await axios.post(`http://localhost:5000/experience`, userobj)
        dispatch( {
            type: ADD_EXPERINCE,
            payload: res.data
        })
        toast.success("Experience added Succesfully");
    }
    catch(e){
        dispatch( {
            type: EXPERINCE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const deleteExperience = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.delete(`http://localhost:5000/experience/`+data)
        dispatch( {
            type: DELETE_EXPERIENCE,
            payload: res.data
        })
        toast.success("Experience deleted Succesfully");
    }
    catch(e){
        dispatch( {
            type: EXPERINCE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const updateExperience = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.put(`http://localhost:5000/experience/`+userId, data)
        dispatch( {
            type: UPDATE_EXPERIENCE,
            payload: res.data
        })
        toast.success("Experience updated Succesfully");
    }
    catch(e){
        dispatch( {
            type: EXPERINCE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}