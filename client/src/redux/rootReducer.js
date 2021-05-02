import {combineReducers} from 'redux';
import profileReducer from './profile/profileReducer'
import authReducer from './auth/auth'
import skillReducer from './skill/skillReducer';
import educationReducer from './education/educationReducer';
import interestReducer from './interest/interestReducer';
import languageReducer from './language/languageReducer';
import experienceReducer from './experience/experienceReducer';
import projectReducer from './project/projectReducer';
import certificateReducer from "./certificate/certificateReducer";


const rootReducer = combineReducers({
    profiles: profileReducer,
    auths: authReducer,
    skills: skillReducer,
    educations: educationReducer,
    language: languageReducer,
    interests: interestReducer,
    experiences: experienceReducer,
    projects: projectReducer,
    certificates: certificateReducer
  })

export default rootReducer;