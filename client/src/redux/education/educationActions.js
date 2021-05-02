import {GET_EDUCATION, ADD_EDUCATION, UPDATE_EDUCATION, EDUCATION_ERROR, DELETE_EDUCATIOIN} from './educationTypes.js'
import axios from 'axios'

export const getEducation = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.get(`http://localhost:5000/education/`+userId)
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
    }
}

export const addEducation = userobj => async dispatch => {
    console.log(userobj)
    try{
        console.log(userobj)
        const res = await axios.post(`http://localhost:5000/education`, userobj)
        dispatch( {
            type: ADD_EDUCATION,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: EDUCATION_ERROR,
            payload: console.log(e),
        })
    }

}

export const deleteEducation = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.delete(`http://localhost:5000/education/`+userId)
        dispatch( {
            type: DELETE_EDUCATIOIN,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: EDUCATION_ERROR,
            payload: console.log(e),
        })
    }

}

export const updateEducation = data => async dispatch => {
    try{
        const res = await axios.put(`http://localhost:5000/education/605a21a8678e49540c9cce3f`, data)
        dispatch( {
            type: UPDATE_EDUCATION,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: EDUCATION_ERROR,
            payload: console.log(e),
        })
    }

}