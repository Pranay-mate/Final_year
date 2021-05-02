import skills from '../models/skills.js';
import mongoose from "mongoose";

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
    const skill = req.body;

    const newSkills = new skills(skill);
    console.log(newSkills)

    try {
        await newSkills.save();
        res.status(201).json(newSkills);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}
export const updateSkills = async (req, res)=>{
    const { id: _id } = req.params;
    const skill = req.body;
    console.log(skill);
    console.log(_id);
    const allSkills = {skill: []};
    for (var key in skill) {
        var obj = skill[key];
        allSkills.skill.push(obj)
    }
    console.log(allSkills);
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no skills with id');
    const updateSkills = await skills.findByIdAndUpdate(_id, allSkills, {new: true});
    res.json(updateSkills);

}