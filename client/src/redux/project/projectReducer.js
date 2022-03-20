import {UPDATE_PROJECTS , ADD_PROJECTS , GET_PROJECTS, DELETE_PROJECTS} from './projectTypes.js'

const initialState = {
    projects:[],
    loading:true
}

export default function(state = initialState, action){

    switch(action.type){

        case GET_PROJECTS:
        return {
            ...state,
            projects:action.payload,
            loading:false
        };
        case ADD_PROJECTS:
            const projects = state.projects.concat(action.payload);
            return {...state, projects};
        case UPDATE_PROJECTS:
            return{
                ...state,
                projects:action.payload
            }
        case DELETE_PROJECTS:
            return{
                ...state,
                projects:action.payload
            }
        default: return state
    }

}