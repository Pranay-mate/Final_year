import {GET_EDUCATION, ADD_EDUCATION, UPDATE_EDUCATION, DELETE_EDUCATIOIN} from './educationTypes.js'

const initialState = {
    educations:[],
    loading:true
}

export default function(state = initialState, action){

    switch(action.type){

        case GET_EDUCATION:
        return {
            ...state,
            educations:action.payload,
            loading:false
        };
        case ADD_EDUCATION:
            const educations = state.educations.concat(action.payload);
            return {...state, educations};
        case UPDATE_EDUCATION:
            return{
                ...state,
                educations:action.payload
            }
        case DELETE_EDUCATIOIN:
            return educations.filter((educations) => educations._id !== action.payload);
        default: return state
    }

}