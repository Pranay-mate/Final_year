import {UPDATE_CERTIFICATE, GET_CERTIFICATE, ADD_CERTIFICATE, CERTIFICATE_ERROR, DELETE_CERTIFICATE} from './certificateTypes.js'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
export const getCertificate = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user == null){
        window.location.href = '/auth';
    }
    const userId = user.result._id;
    try{
        const res = await axios.get(`https://sleepy-reaches-43026.herokuapp.com/Final_year/certificates/`+userId)
        console.log(res.data);
        dispatch( {
            type: GET_CERTIFICATE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( { 
            type: CERTIFICATE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }
}

export const addCertificate = userobj => async dispatch => {
    console.log(userobj)
    try{
        console.log(userobj)
        const res = await axios.post(`https://sleepy-reaches-43026.herokuapp.com/Final_year/certificates`, userobj)
        dispatch( {
            type: ADD_CERTIFICATE,
            payload: res.data
        })
        toast.success("Certificate added Succesfully");
    }
    catch(e){
        dispatch( {
            type: CERTIFICATE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const deleteCertificate = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.delete(`https://sleepy-reaches-43026.herokuapp.com/Final_year/certificates/`+data)
        dispatch( {
            type: DELETE_CERTIFICATE,
            payload: res.data
        })
        toast.success("Certificate deleted Succesfully");
    }
    catch(e){
        dispatch( {
            type: CERTIFICATE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const updateCertificate = data => async dispatch => {
        const user = JSON.parse(localStorage.getItem('profile'));
        const userId = user.result._id;
    try{
        const res = await axios.put(`https://sleepy-reaches-43026.herokuapp.com/Final_year/certificates/`+userId, data)
        dispatch( {
            type: UPDATE_CERTIFICATE,
            payload: res.data
        })
        toast.success("Certificate updated Succesfully");
    }
    catch(e){
        dispatch( {
            type: CERTIFICATE_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}