import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    
    {
        posts: [{
            Fname: String,
            Mname: String,
            Lname: String,
            title: String,
            EmailId: String,
            ContactNumber: String,
            Address: String,
            Creator: String
        }
 
    ]
}
);

const PostMsg = mongoose.model('PostMsg', postSchema);

export default PostMsg;