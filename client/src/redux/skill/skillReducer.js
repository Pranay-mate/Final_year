import {GET_SKILLS, ADD_SKILLS, UPDATE_SKILLS, DELETE_SKILLS} from './skillTypes.js'

const initialState = {
    skills:[],
    loading:true
}

export default function(state = initialState, action){
    console.log(action)
    switch(action.type){

        case GET_SKILLS:
        return {
            ...state,
            skills:action.payload,
            loading:false
        };

        case ADD_SKILLS:
            const skills = state.skills.concat(action.payload);
        return {...state, skills};

        case UPDATE_SKILLS:
        return{
            ...state,
            skills:action.payload,
            loading:false

        }
        case DELETE_SKILLS:
            return{
                ...state,
                skills:action.payload,
                loading:false
    
            }
        default: return state
    }

}