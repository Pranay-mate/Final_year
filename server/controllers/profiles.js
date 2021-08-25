import Profiles from '../models/profiles.js';
import mongoose from 'mongoose';
export const getProfile = async (req, res)=>{
    const { id } = req.params;
    console.log(req.params)
    try {
        const profiles = await Profiles.find({userID: id});
        //console.log(postMsg)
        res.status(200).json(profiles);
    } catch (error) {
        res.status(400).json({message: error.message});
        
    }
}

export const addProfile = async (req, res)=>{
    const profile = req.body;
    const newProfile = new Profiles(profile);

    try {
        await newProfile.save();

        res.status(201).json(newProfile);
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}
export const updateProfile = async (req, res)=>{
    const { id: _id } = req.params;
    const profile = req.body;
    console.log(profile);

    if(!mongoose.Types.ObjectId.isValid(profile.profileID)) return res.status(404).send('no posts with id');
    const updateProfile = await Profiles.findByIdAndUpdate(profile.profileID, profile, {new: true});
    const profiles = await Profiles.find({userID: profile.profileID});
    //console.log(postMsg)
    res.status(200).json(profiles);

}

export const deleteProfile = async (req, res)=>{
    console.log(req.params);
     const { id} = req.params;
     console.log(id);
    // const certificates = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no certificates with id');
    const deleteProfile = await Profiles.findByIdAndRemove(id);
    res.json(deleteProfile);

}