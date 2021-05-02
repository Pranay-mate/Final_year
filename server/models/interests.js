import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const interestSchema = mongoose.Schema(
    {
        Interest: String,
    }
);

const Interests = mongoose.model('Interests', interestSchema);

export default Interests;