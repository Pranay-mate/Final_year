import PostMsg from '../models/postMsg.js';

export const getProfile = async (req, res)=>{
    const { id } = req.params;
    console.log(req.params)
    try {
        const postMsg = await PostMsg.findById(id);
        //console.log(postMsg)
        res.status(200).json(postMsg);
    } catch (error) {
        res.status(400).json({message: error.message});
        
    }
}

export const addProfile = async (req, res)=>{
    const post = req.body;
    const newPost = new PostMsg(post);
    newPost.push(post)
    const a = newPost.posts
    console.log(a)


    try {
        await newPost.posts.save();

        res.status(201).json(newPost.posts);
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}
export const updateProfile = async (req, res)=>{
    const { id: _id } = req.params;
    const post = req.body;
    console.log(post);

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no posts with id');
    const updateUser = await PostMsg.findByIdAndUpdate(_id, post, {new: true});
    res.json(updateUser);

}