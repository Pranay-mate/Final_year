import {GET_EXPERINCE, ADD_EXPERINCE, UPDATE_EXPERIENCE, DELETE_EXPERIENCE} from './experienceTypes.js'

const initialState = {
    experiences:[],
    loading:true
}

export default function(state = initialState, action){

    switch(action.type){
        case GET_EXPERINCE:
        return {
            ...state,
            experiences:action.payload,
            loading:false
        };
        case ADD_EXPERINCE:
            const experiences = state.experiences.concat(action.payload);
            return {...state, experiences};
        case UPDATE_EXPERIENCE:
            return{
                ...state,
                experiences:action.payload
            }
        case DELETE_EXPERIENCE:
            return experiences.filter((experiences) => experiences._id !== action.payload);
        default: return state
    }

}