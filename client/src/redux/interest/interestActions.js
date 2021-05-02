import {GET_INTEREST, ADD_INTEREST, UPDATE_INTEREST, INTEREST_ERROR, DELETE_INTEREST} from './interestTypes.js'
import axios from 'axios'

export const getInterests = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.get(`http://localhost:5000/interests/`+userId)
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
    }
}

export const addInterests = userobj => async dispatch => {
    console.log(userobj)
    try{
        console.log(userobj)
        const res = await axios.post(`http://localhost:5000/interests`, userobj)
        dispatch( {
            type: ADD_INTEREST,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: INTEREST_ERROR,
            payload: console.log(e),
        })
    }

}

export const deleteInterest = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.delete(`http://localhost:5000/interests/`+userId)
        dispatch( {
            type: DELETE_INTEREST,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: INTEREST_ERROR,
            payload: console.log(e),
        })
    }

}

export const updateInterest = data => async dispatch => {
    try{
        const res = await axios.put(`http://localhost:5000/interests/605a21a8678e49540c9cce3f`, data)
        dispatch( {
            type: UPDATE_INTEREST,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: INTEREST_ERROR,
            payload: console.log(e),
        })
    }

}