import {GET_PROJECTS, ADD_PROJECTS, UPDATE_PROJECTS, PROJECTS_ERROR, DELETE_PROJECTS} from './projectTypes.js'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

export const getProjects = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user == null){
        window.location.href = '/auth';
    }
    const userId = user.result._id;
    try{
        const res = await axios.get(`https://sleepy-reaches-43026.herokuapp.com/projects/`+userId)
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
        toast.error("Error! Please contact with IT Team");
    }
}

export const addProjects = userobj => async dispatch => {
    console.log(userobj)
    try{
        console.log(userobj)
        const res = await axios.post(`https://sleepy-reaches-43026.herokuapp.com/projects`, userobj)
        dispatch( {
            type: ADD_PROJECTS,
            payload: res.data
        })
        toast.success("Project added Succesfully");
    }
    catch(e){
        dispatch( {
            type: PROJECTS_ERROR,
            payload: console.log(e)
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const deleteProjects = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.delete(`https://sleepy-reaches-43026.herokuapp.com/projects/`+data)
        dispatch( {
            type: DELETE_PROJECTS,
            payload: res.data
        })
        toast.success("Project deleted Succesfully");
    }
    catch(e){
        dispatch( {
            type: PROJECTS_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const updateProjects = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    try{
        const res = await axios.put(`https://sleepy-reaches-43026.herokuapp.com/projects/`+userId, data)
        dispatch( {
            type: UPDATE_PROJECTS,
            payload: res.data
        })
        toast.success("Project updated Succesfully");
    }
    catch(e){
        dispatch( {
            type: PROJECTS_ERROR,
            payload: console.log(e)
        })
        toast.error("Error! Please contact with IT Team");
    }

}