import {GET_PROJECTS, ADD_PROJECTS, UPDATE_PROJECTS, PROJECTS_ERROR, DELETE_PROJECTS} from './projectTypes.js'
import axios from 'axios'

export const getProjects = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.get(`http://localhost:5000/projects/`+userId)
        console.log(res.data);
        dispatch( {
            type: GET_PROJECTS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( { 
            type: PROJECTS_ERROR,
            payload: console.log(e)
        })
    }
}

export const addProjects = userobj => async dispatch => {
    console.log(userobj)
    try{
        console.log(userobj)
        const res = await axios.post(`http://localhost:5000/projects`, userobj)
        dispatch( {
            type: ADD_PROJECTS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: PROJECTS_ERROR,
            payload: console.log(e)
        })
    }

}

export const deleteProjects = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.delete(`http://localhost:5000/projects/`+userId)
        dispatch( {
            type: DELETE_PROJECTS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: PROJECTS_ERROR,
            payload: console.log(e),
        })
    }

}

export const updateProjects = data => async dispatch => {
    try{
        const res = await axios.put(`http://localhost:5000/projects/605a21a8678e49540c9cce3f`, data)
        dispatch( {
            type: UPDATE_PROJECTS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: PROJECTS_ERROR,
            payload: console.log(e)
        })
    }

}