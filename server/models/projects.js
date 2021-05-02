import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
    {
        ProjectName: String,
        SDate: String,
        PresetDate: Boolean,
        EDate: String,
        Description: String
    }
);

const Projects = mongoose.model('Projects', projectSchema);

export default Projects;