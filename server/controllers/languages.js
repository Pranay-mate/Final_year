import Languages from '../models/languages.js';
import mongoose from 'mongoose';
export const getLanguages = async (req, res)=>{
    const { id } = req.params;
    console.log(req.params)
    try {
        const languages = await Languages.findById(id);
        console.log(languages)
        res.status(200).json(languages);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const addLanguages = async (req, res)=>{
    const languages = req.body;
    console.log(languages)
    const newLanguages = new Languages(languages);
    try {
        await newLanguages.save();

        res.status(201).json(newLanguages.languages);
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}
export const updateLanguages = async (req, res)=>{
    const { id: _id } = req.params;
    const languages = req.body;
    console.log(languages);

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no languages with id');
    const upadateLanguage = await Languages.findByIdAndUpdate(_id, languages, {new: true});
    res.json(upadateLanguage);

}

export const deleteLanguages = async (req, res)=>{
    console.log(req.params);
     const { id} = req.params;
     console.log(id);
    // const certificates = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no certificates with id');
    const deleteLanguage = await Languages.findByIdAndRemove(id);
    res.json(deleteLanguage);

}