import { Request, Response } from 'express';
import UserModel from '../models/user';
import Clarifai from 'clarifai';

const updateEntry = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) return res.status(400).json('Incorrect credentials.');

  let user = await UserModel.findByPk(id);
  if (!user) return res.status(400).json('User not found.');
  user.entries = user.entries + 1;
  try {
    await user.save();
    return res.json(user.entries);
  } catch (error) {
    return res.status(400).json('Entry update failed.');
  }
};

const faceRecognition = async (req: Request, res: Response) => {
  const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY
  });

  try {
    const data = await app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      req.body.input
    );
    return res.json(data);
  } catch (error) {
    return res.status(400).json('Unable to work with API');
  }
};

export default {
  updateEntry,
  faceRecognition
};
