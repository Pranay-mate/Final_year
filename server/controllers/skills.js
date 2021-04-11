import skills from '../models/skills.js';

export const getSkills = async (req, res)=>{
    try {
        const Skills = await skills.find();
       // console.log(Skills);
        res.status(200).json(Skills);
    } catch (error) {
        res.status(400).json({message: error.message});
        
    }
}

export const addSkills = async (req, res)=>{
    const skills = req.body;
    const newSkills = new Skills(skills);

    try {
        await newSkills.save();
        res.status(201).json(newSkills);
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}
export const updateSkills = async (req, res)=>{
    const { id: _id } = req.params;
    const skills = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no skills with id');
    const updateSkills = await PostMsg.findByIdAndUpdate(_id, skills, {new: true});
    res.json(updateSkills);

}