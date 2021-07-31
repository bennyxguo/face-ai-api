import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../../database';
import UserModel from './userModel';
import LoginModel from './loginModel';
import { createAuthToken } from './authToken';
import { AuthRequest } from './authTypes';

const authentication = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await verifyUser(email, password);
    if (user instanceof UserModel) {
      const authToken = await createAuthToken(user);
      return res.json(authToken);
    } else {
      throw new Error('User not found.');
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const verifyUser = async (email: string, password: string): Promise<UserModel | string> => {
  // Check credentials
  if (!email || !password) {
    return Promise.reject('Incorrect form submittion.');
  }

  const login = await LoginModel.findOne({ where: { email } });

  if (!login) return Promise.reject('Wrong credentials');
  // Check password
  const isValidPassword = await bcrypt.compare(password, login.hash);

  if (isValidPassword) {
    const user = await UserModel.findByPk(login.uid);
    return Promise.resolve(user);
  }

  return Promise.reject('Wrong credentials');
};

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json('Incorrect form submittion.');
  }

  const trx = await db.transaction();

  try {
    const user = await UserModel.create(
      {
        name,
        email
      },
      { transaction: trx }
    );

    const hash = await bcrypt.hash(password, 12);
    await LoginModel.create(
      {
        uid: user.id,
        entries: 0,
        hash,
        name,
        email
      },
      { transaction: trx }
    );

    await trx.commit();

    return res.json(user);
  } catch (error) {
    await trx.rollback();
    return res.status(400).json('Unable to register.');
  }
};

const show = async (req: AuthRequest, res: Response) => {
  const { userId } = req;
  if (!userId) return res.status(400).json('Incorrect credentials.');

  const user = await UserModel.findByPk(userId);
  if (!user) return res.status(400).json('User not found.');

  return res.json(user);
};

const update = async (req: AuthRequest, res: Response) => {
  const { userId } = req;
  const { name, age, hobby } = req.body;

  // Check credentials
  if (!userId || (!name && !age && !hobby)) {
    return res.status(400).json('Incorrect credentials.');
  }

  const user = await UserModel.findByPk(userId);
  if (!user) return res.status(400).json('User not found.');

  try {
    await user.update({ ...req.body });
    return res.json('Updated completed.');
  } catch (error) {
    return res.status(400).json('Unable to update user.');
  }
};

export default {
  authentication,
  register,
  show,
  update
};
