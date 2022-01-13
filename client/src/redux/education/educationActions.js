import {GET_EDUCATION, ADD_EDUCATION, UPDATE_EDUCATION, EDUCATION_ERROR, DELETE_EDUCATIOIN} from './educationTypes.js'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

export const getEducation = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user == null){
        window.location.href = '/auth';
    }
    const userId = user.result._id;
    try{
        const res = await axios.get(`https://sleepy-reaches-43026.herokuapp.com/education/`+userId)
        console.log(res.data);
        dispatch( {
            type: GET_EDUCATION,
            payload: res.data
        })

    }
    catch(e){
        dispatch( { 
            type: EDUCATION_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }
}

export const addEducation = userobj => async dispatch => {
    console.log(userobj)
    try{
        console.log(userobj)
        const res = await axios.post(`https://sleepy-reaches-43026.herokuapp.com/education`, userobj)
        dispatch( {
            type: ADD_EDUCATION,
            payload: res.data
        })
        toast.success("Education added Succesfully");
    }
    catch(e){
        dispatch( {
            type: EDUCATION_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const deleteEducation = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.delete(`https://sleepy-reaches-43026.herokuapp.com/education/`+data)
        dispatch( {
            type: DELETE_EDUCATIOIN,
            payload: res.data
        })
        toast.success("Education deleted Succesfully");
    }
    catch(e){
        dispatch( {
            type: EDUCATION_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const updateEducation = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.put(`https://sleepy-reaches-43026.herokuapp.com/education/`+userId, data)
        dispatch( {
            type: UPDATE_EDUCATION,
            payload: res.data
        })
        toast.success("Education updated Succesfully");
    }
    catch(e){
        dispatch( {
            type: EDUCATION_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}