import express from 'express';
import { addSkills, getSkills, updateSkills }  from '../controllers/skills.js';
const router = express.Router();

router.get('/', getSkills);
router.post('/', addSkills);
router.put('/:id', updateSkills);

export default router;