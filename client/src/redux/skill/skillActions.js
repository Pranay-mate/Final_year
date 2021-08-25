import {GET_SKILLS, ADD_SKILLS, UPDATE_SKILLS, SKILL_ERROR, DELETE_SKILLS} from './skillTypes.js'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

export const getSkills = () => async dispatch => {
    
    try{
        const user = JSON.parse(localStorage.getItem('profile'));
        if (user == null){
            window.location.href = '/auth';
        }
        const userId = user.result._id;

        const res = await axios.get(`http://localhost:5000/skills/`+userId)
        console.log(res.data);
        dispatch( {
            type: GET_SKILLS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( { 
            type: SKILL_ERROR,
            payload: console.log(e)
        })
        toast.error("Error! Please contact with IT Team");

    }

}
export const addSkills = userobj => async dispatch => {
    console.log(userobj)
    try{
        const res = await axios.post(`http://localhost:5000/skills`, userobj)
        dispatch( {
            type: ADD_SKILLS,
            payload: res.data
        })
        toast.success("Skill added Succesfully");

    }
    catch(e){
        dispatch( {
            type: SKILL_ERROR,
            payload: console.log(e)
        })
        toast.error("Error! Please contact with IT Team");

    }

}

export const updateSkills = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    console.log(data);
    try{
        const res = await axios.put(`http://localhost:5000/skills/`+userId, data)
        console.log(res)
        dispatch( {
            type: UPDATE_SKILLS,
            payload: res.data
        })
        toast.success("Skill updated Succesfully");
    }
    catch(e){
        dispatch({
            type: SKILL_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}

export const deleteSkills = data => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user.result._id;
    //console.log(data)
    try{
        const res = await axios.delete(`http://localhost:5000/skills/`+data)
        dispatch( {
            type: DELETE_SKILLS,
            payload: res.data
        })
        toast.success("Skill deleted Succesfully");
    }
    catch(e){
        dispatch( {
            type: SKILL_ERROR,
            payload: console.log(e),
        })
        toast.error("Error! Please contact with IT Team");
    }

}