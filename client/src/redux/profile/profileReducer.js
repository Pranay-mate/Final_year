import {GET_PROFILE, ADD_PROFILE, UPDATE_PROFILE, DELETE_PROFILE} from './profileTypes.js'

const initialState = {
    profiles:[],
    loading:true
}

export default function(state = initialState, action){

    switch(action.type){

        case GET_PROFILE:
        return {
            ...state,
            profiles:action.payload,
            loading:false
        };
        case ADD_PROFILE:

            const profiles = state.profiles.concat(action.payload);
            return {...state, profiles};
        case UPDATE_PROFILE:
            return{
                ...state,
                profiles:action.payload
            }
        case DELETE_PROFILE:
            return{
                ...state,
                profiles:action.payload
            }
        default: return state
    }

}