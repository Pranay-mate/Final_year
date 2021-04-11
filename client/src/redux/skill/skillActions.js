import {GET_SKILLS, ADD_SKILLS, UPDATE_SKILLS, SKILL_ERROR} from './skillTypes.js'
import axios from 'axios'

export const getSkills = () => async dispatch => {
    
    try{
        const res = await axios.get(`http://localhost:5000/skills`)
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
    }

}
export const addSkills = userobj => async dispatch => {
    
    try{
        const res = await axios.post(`http://localhost:5000/skills`, userobj)
        dispatch( {
            type: ADD_SKILLS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: SKILL_ERROR,
            payload: console.log(e)
        })
    }

}

export const updateSkills = data => async dispatch => {
    try{
        const res = await axios.put(`http://localhost:5000/skills/605a21a8678e49540c9cce3f`, data)
        dispatch( {
            type: UPDATE_SKILLS,
            payload: res.data
        })
    }
    catch(e){
        dispatch({
            type: SKILL_ERROR,
            payload: console.log(e),
        })
    }

}