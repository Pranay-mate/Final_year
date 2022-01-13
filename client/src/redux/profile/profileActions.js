import {GET_PROFILE, ADD_PROFILE, UPDATE_PROFILE, PROFILE_ERROR, DELETE_PROFILE} from './profileTypes.js'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

export const getProfile = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user == null){
        window.location.href = '/auth';
    }
    const userId = user.result._id;
    try{
        const res = await axios.get(`https://sleepy-reaches-43026.herokuapp.com/profile/`+userId)
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
        toast.error("Error! Please contact with IT Team");
    }

}
export const addProfile = userobj => async dispatch => {
    
    try{
        console.log(userobj)
        const res = await axios.post(`https://sleepy-reaches-43026.herokuapp.com/profile`, userobj)
        dispatch( {
            type: ADD_PROFILE,
            payload: res.data
        })
        toast.success("Profile added Succesfully");
    }
    catch(e){
        dispatch( {
            type: PROFILE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const deleteProfile = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.delete(`https://sleepy-reaches-43026.herokuapp.com/profile/`+data)
        dispatch( {
            type: DELETE_PROFILE,
            payload: res.data
        })
        toast.success("Profile deleted Succesfully");
    }
    catch(e){
        dispatch( {
            type: PROFILE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const updateProfile = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.put(`https://sleepy-reaches-43026.herokuapp.com/profile/`+userId, data)
        dispatch( {
            type: UPDATE_PROFILE,
            payload: res.data
        })
        toast.success("Profile updated Succesfully");
    }
    catch(e){
        dispatch( {
            type: PROFILE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}