import {GET_INTEREST, ADD_INTEREST, UPDATE_INTEREST, DELETE_INTEREST} from './interestTypes.js'

const initialState = {
    interests:[],
    loading:true
}

export default function(state = initialState, action){

    switch(action.type){

        case GET_INTEREST:
        return {
            ...state,
            interests:action.payload,
            loading:false
        };
        case ADD_INTEREST:
            const interests = state.interests.concat(action.payload);
            return {...state, interests};
        case UPDATE_INTEREST:
            return{
                ...state,
                interests:action.payload
            }
        case DELETE_INTEREST:
            return interests.filter((interests) => interests._id !== action.payload);
        default: return state
    }

}