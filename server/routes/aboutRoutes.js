import express from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';

const router = express.Router();

router.get('/', getAbout); // Fetch "About" content
router.put('/', updateAbout); // Update "About" content

export default router;
