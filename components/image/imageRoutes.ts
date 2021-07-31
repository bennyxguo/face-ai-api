import express from 'express';
const router = express.Router();
import auth from '../user/authMiddleware';
import catchAsync from '../../utils/catchAsync';
import imageControllers from './imageController';

router.put('/updateEntry', auth, catchAsync(imageControllers.updateEntry));
router.post('/faceRecognition', auth, imageControllers.faceRecognition);

export default router;
