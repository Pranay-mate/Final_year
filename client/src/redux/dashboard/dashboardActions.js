import {GET_SCORE, ERROR_DASHBOARD} from './dashboardTypes.js'
import axios from 'axios'

export const getScore = () => async dispatch => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user == null){
        window.location.href = '/auth';
    }
    const userId = user.result._id;
    try{
        const res = await axios.get(`http://localhost:5000/score/`+userId)
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