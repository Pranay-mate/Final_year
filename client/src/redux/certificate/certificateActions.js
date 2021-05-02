import {UPDATE_CERTIFICATE, GET_CERTIFICATE, ADD_CERTIFICATE, CERTIFICATE_ERROR, DELETE_CERTIFICATE} from './certificateTypes.js'
import axios from 'axios'

export const getCertificate = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.get(`http://localhost:5000/certificates/`+userId)
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
    }
}

export const addCertificate = userobj => async dispatch => {
    console.log(userobj)
    try{
        console.log(userobj)
        const res = await axios.post(`http://localhost:5000/certificates`, userobj)
        dispatch( {
            type: ADD_CERTIFICATE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: CERTIFICATE_ERROR,
            payload: console.log(e),
        })
    }

}

export const deleteCertificate = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.delete(`http://localhost:5000/certificates/`+userId)
        dispatch( {
            type: DELETE_CERTIFICATE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: CERTIFICATE_ERROR,
            payload: console.log(e),
        })
    }

}

export const updateCertificate = data => async dispatch => {
        const user = JSON.parse(localStorage.getItem('profile'));
        const userId = user.result._id;
    try{
        const res = await axios.put(`http://localhost:5000/certificates/`+userId)
        dispatch( {
            type: UPDATE_CERTIFICATE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: CERTIFICATE_ERROR,
            payload: console.log(e),
        })
    }

}