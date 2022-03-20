import { DELETE_CERTIFICATE , GET_CERTIFICATE, ADD_CERTIFICATE, UPDATE_CERTIFICATE} from './certificateTypes.js'

const initialState = {
    certificates:[],
    loading:true
}

export default function(state = initialState, action){

    switch(action.type){
        case GET_CERTIFICATE:
        return {
            ...state,
            certificates:action.payload,
            loading:false
        };
        case ADD_CERTIFICATE:
            const certificates = state.certificates.concat(action.payload);
            return {...state, certificates};
        case UPDATE_CERTIFICATE:
            return{
                ...state,
                certificates:action.payload
            }
        case DELETE_CERTIFICATE:
            return{
                ...state,
                certificates:action.payload
            }
        default: return state
    }

}