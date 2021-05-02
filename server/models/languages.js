import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const languageSchema = mongoose.Schema(
    {
        Language: String,
        Proficiency: String
    }
);

const Languages = mongoose.model('Languages', languageSchema);

export default Languages;