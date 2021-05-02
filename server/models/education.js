import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const educationSchema = mongoose.Schema(
    {
        Program: String,
        Institude: String,
        SDate: String,
        PresetDate: Boolean,
        EDate: String,
        InstitudeAdd: String
    }
);

const Educations = mongoose.model('Educations', educationSchema);

export default Educations;