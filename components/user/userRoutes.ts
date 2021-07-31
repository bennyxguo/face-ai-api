import express from 'express';
const router = express.Router();
import catchAsync from '../../utils/catchAsync';
import userController from './userController';
import auth from './authMiddleware';

router.get('/', async (req, res) => {
  res.send('Welcome to Face AI API...');
});

router.post('/login', catchAsync(userController.authentication));
router.post('/register', catchAsync(userController.register));
router.get('/user', auth, catchAsync(userController.show));
router.put('/user', auth, catchAsync(userController.update));

export default router;
