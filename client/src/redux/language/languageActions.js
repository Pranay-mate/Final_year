import {GET_LANGUAGE, ADD_LANGUAGE, UPDATE_LANGUAGE, LANGUAGE_ERROR, DELETE_LANGUAGE} from './languageTypes.js'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

export const getLanguage = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user == null){
        window.location.href = '/auth';
    }
    const userId = user.result._id;
    try{
        const res = await axios.get(`http://localhost:5000/languages/`+userId)
        console.log(res.data);
        dispatch( {
            type: GET_LANGUAGE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( { 
            type: LANGUAGE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }
}

export const addLanguage = userobj => async dispatch => {
    console.log(userobj)
    try{
        console.log(userobj)
        const res = await axios.post(`http://localhost:5000/languages`, userobj)
        dispatch( {
            type: ADD_LANGUAGE,
            payload: res.data
        })
        toast.success("Language added Succesfully");
    }
    catch(e){
        dispatch( {
            type: LANGUAGE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const deleteLanguage = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.delete(`http://localhost:5000/languages/`+data)
        dispatch( {
            type: DELETE_LANGUAGE,
            payload: res.data
        })
        toast.success("Language deleted Succesfully");
    }
    catch(e){
        dispatch( {
            type: LANGUAGE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const updateLanguage = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    console.log(data);
    try{
        const res = await axios.put(`http://localhost:5000/languages/`+userId, data)
        dispatch( {
            type: UPDATE_LANGUAGE,
            payload: res.data
        })
        toast.success("Language updated Succesfully");
    }
    catch(e){
        dispatch( {
            type: LANGUAGE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}