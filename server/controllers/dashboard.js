import mongoose from 'mongoose';
import Educations from '../models/education.js';
import Experiences from '../models/experience.js';
import Interests from '../models/interests.js';
import Languages from '../models/languages.js';
import Projects from '../models/projects.js';
import skills from '../models/skills.js';
import Certificates from '../models/certificates.js';   

export const getScore = async (req, res)=>{
    const { id } = req.params;
    console.log(req.params)
    var score = 0;
    try {
        const Apis = [Educations, Experiences, Interests, Languages, Projects, skills, Certificates];
        await Promise.all(Apis.map(api => {
            console.log(api)
        }))
        Apis.forEach(async (api) => {
            const resData = await api.find({userID: id});
            if(resData.length > 0){
                score++;
            }
            // console.log(score);
        });
        setTimeout(() => {
            score = ~~(score/(Apis.length)*100);
             res.status(200).json(score);
        }, 1000);
        //console.log(certificates)
        //res.status(200).json(certificates);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
