import mongoose from 'mongoose';

const profileSchema = mongoose.Schema(
    
    {
            Fname: String,
            Mname: String,
            Lname: String,
            title: String,
            EmailId: String,
            ContactNumber: String,
            Address: String,
            Creator: String
    }
 
);

const Profiles = mongoose.model('Profile', profileSchema);

export default Profiles;