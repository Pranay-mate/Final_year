import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const certificateSchema = mongoose.Schema(
    {
        CertiName: String,
        SDate: String,
        PresetDate: Boolean,
        EDate: String,
        Description: String
    }
);

const Certificates = mongoose.model('Certificate', certificateSchema);

export default Certificates;