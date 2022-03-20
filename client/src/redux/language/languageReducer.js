import {GET_LANGUAGE, ADD_LANGUAGE, UPDATE_LANGUAGE, DELETE_LANGUAGE} from './languageTypes.js'

const initialState = {
    languages:[],
    loading:true
}

export default function(state = initialState, action){

    switch(action.type){

        case GET_LANGUAGE:
        return {
            ...state,
            languages:action.payload,
            loading:false
        };
        case ADD_LANGUAGE:
            const languages = state.languages.concat(action.payload);
            return {...state, languages};
        case UPDATE_LANGUAGE:
            return{
                ...state,
                languages:action.payload
            }
        case DELETE_LANGUAGE:
            return{
                ...state,
                languages:action.payload
            }
        default: return state
    }

}