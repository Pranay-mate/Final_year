import {GET_SCORE, ERROR_DASHBOARD, GET_SKILLS_DATA} from './dashboardTypes.js'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

export const getScore = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user == null){
        window.location.href = '/auth';
    }
    const userId = user.result._id;
    try{
        const res = await axios.get(`https://sleepy-reaches-43026.herokuapp.com/Final_year/score/`+userId)
        // console.log(res.data);
        dispatch( {
            type: GET_SCORE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( { 
            type: ERROR_DASHBOARD,
            payload: console.log(e),
        })
    }
}

export const getSkillsData = skillsData => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user == null){
        window.location.href = '/auth';
    }
    
    const userId = user.result._id;
    try{
        const res = await axios.post(`https://sleepy-reaches-43026.herokuapp.com/Final_year/score/`,skillsData)
        toast.success("Your skills score according to your interested job profile is "+res.data[0].skillsData+" %");
        console.log(res.data);
        dispatch( {
            type: GET_SKILLS_DATA,
            payload: res.data
        })
    }
    catch(e){
        dispatch( { 
            type: ERROR_DASHBOARD,
            payload: console.log(e),
        })
    }
}

