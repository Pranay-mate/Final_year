import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const experinceSchema = mongoose.Schema(
    {
        Title: String,
        Workplace: String,
        SDate: String,
        EDate: String,
        PresetDate: Boolean,
        WorkplaceAdd: String,
        Achievements: String,
        ContactInfo: String
    }
);

const Experiences = mongoose.model('Experiences', experinceSchema);

export default Experiences;