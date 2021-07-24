import express from 'express';
const router = express.Router();
import catchAsync from '../utils/catchAsync';
import imageControllers from '../controllers/image';

router.put('/updateEntry', catchAsync(imageControllers.updateEntry));
router.post('/faceRecognition', catchAsync(imageControllers.faceRecognition));

export default router;
