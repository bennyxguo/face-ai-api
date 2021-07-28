import express from 'express';
const router = express.Router();
import catchAsync from '../../utils/catchAsync';
import imageControllers from './imageController';

router.put('/updateEntry', catchAsync(imageControllers.updateEntry));
router.post('/faceRecognition', imageControllers.faceRecognition);

export default router;
