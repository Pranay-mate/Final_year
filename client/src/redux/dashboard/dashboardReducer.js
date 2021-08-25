import { GET_SCORE, ERROR_DASHBOARD } from './dashboardTypes.js'

const initialState = {
    dashboard:[],
    loading:true
}

export default function(state = initialState, action){
    console.log(state);
    console.log(action);
    switch(action.type){
        case GET_SCORE:
        return {
            ...state,
            dashboard:action.payload,
            loading:false
        };
        case ERROR_DASHBOARD:
            return{
                ...state,
                dashboard:action.payload
            }
        default: return state
    }

}