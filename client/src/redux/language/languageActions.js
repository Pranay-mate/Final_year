import {GET_LANGUAGE, ADD_LANGUAGE, UPDATE_LANGUAGE, LANGUAGE_ERROR, DELETE_LANGUAGE} from './languageTypes.js'
import axios from 'axios'

export const getLanguage = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
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
    }
    catch(e){
        dispatch( {
            type: LANGUAGE_ERROR,
            payload: console.log(e),
        })
    }

}

export const deleteLanguage = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.delete(`http://localhost:5000/languages/`+userId)
        dispatch( {
            type: DELETE_LANGUAGE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: LANGUAGE_ERROR,
            payload: console.log(e),
        })
    }

}

export const updateLanguage = data => async dispatch => {
    try{
        const res = await axios.put(`http://localhost:5000/languages/605a21a8678e49540c9cce3f`, data)
        dispatch( {
            type: UPDATE_LANGUAGE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: LANGUAGE_ERROR,
            payload: console.log(e),
        })
    }

}