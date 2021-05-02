import Projects from '../models/projects.js';
import mongoose from 'mongoose';
export const getProjects = async (req, res)=>{
    const { id } = req.params;
    console.log(req.params)
    try {
        const projects = await Projects.findById(id);
        console.log(projects)
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const addProjects = async (req, res)=>{
    const projects = req.body;
    console.log(projects)
    const newProject = new Projects(projects);
    try {
        await newProject.save();

        res.status(201).json(newProject.projects);
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}
export const updateProjects = async (req, res)=>{
    const { id: _id } = req.params;
    const projects = req.body;
    console.log(projects);

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no project with id');
    const updateProject = await Projects.findByIdAndUpdate(_id, projects, {new: true});
    res.json(updateProject);

}
export const deleteProjects = async (req, res)=>{
    console.log(req.params);
     const { id} = req.params;
     console.log(id);
    // const certificates = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no project with id');
    const deleteproject = await Projects.findByIdAndRemove(id);
    res.json(deleteproject);

}