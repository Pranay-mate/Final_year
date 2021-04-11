import express from 'express';
import { addProfile, getProfile, updateProfile }  from '../controllers/posts.js';
const router = express.Router();

router.get('/', getProfile);
router.get('/:id', getProfile);
router.post('/', addProfile);
router.put('/:id', updateProfile);

export default router;