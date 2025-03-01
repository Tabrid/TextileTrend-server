import express from 'express';
import { getPrivacyPolicy, updatePrivacyPolicy } from '../controllers/privacyPolicyController.js';

const router = express.Router();

router.get('/', getPrivacyPolicy);
router.put('/', updatePrivacyPolicy); 

export default router;

