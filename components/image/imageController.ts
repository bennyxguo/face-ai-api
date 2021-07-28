import { Request, Response } from 'express';
import UserModel from '../user/userModel';
import ClarifaiApi from '../../utils/clarifaiApi';

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
  const successCallback = (response: any) => {
    return res.json(response);
  };

  const failCallback = (error) => {
    return res.status(400).json(error);
  };

  ClarifaiApi(req.body.imageUrl, successCallback, failCallback);
};

export default {
  updateEntry,
  faceRecognition
};
