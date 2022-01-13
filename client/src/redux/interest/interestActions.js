import {GET_INTEREST, ADD_INTEREST, UPDATE_INTEREST, INTEREST_ERROR, DELETE_INTEREST} from './interestTypes.js'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

export const getInterests = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user == null){
        window.location.href = '/auth';
    }
    const userId = user.result._id;
    try{
        const res = await axios.get(`https://sleepy-reaches-43026.herokuapp.com/interests/`+userId)
        console.log(res.data);
        dispatch( {
            type: GET_INTEREST,
            payload: res.data
        })
    }
    catch(e){
        dispatch( { 
            type: INTEREST_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }
}

export const addInterests = userobj => async dispatch => {
    console.log(userobj)
    try{
        const res = await axios.post(`https://sleepy-reaches-43026.herokuapp.com/interests`, userobj)
        dispatch( {
            type: ADD_INTEREST,
            payload: res.data
        })
        toast.success("Interest added Succesfully");
    }
    catch(e){
        dispatch( {
            type: INTEREST_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const deleteInterest = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.delete(`https://sleepy-reaches-43026.herokuapp.com/interests/`+data)
        dispatch( {
            type: DELETE_INTEREST,
            payload: res.data
        })
        toast.success("Interest deleted Succesfully");
    }
    catch(e){
        dispatch( {
            type: INTEREST_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const updateInterest = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.put(`https://sleepy-reaches-43026.herokuapp.com/interests/`+userId, data)
        dispatch( {
            type: UPDATE_INTEREST,
            payload: res.data
        })
        toast.success("Interest updated Succesfully");
    }
    catch(e){
        dispatch( {
            type: INTEREST_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}