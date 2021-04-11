import {combineReducers} from 'redux';
import userReducer from './profile/profileReducer'
import authReducer from './auth/auth'
import skillReducer from './skill/skillReducer';
const rootReducer = combineReducers({
    profiles: userReducer,
    auths: authReducer,
    skills: skillReducer
  })

export default rootReducer;