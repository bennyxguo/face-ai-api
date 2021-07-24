import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import LoginModel from '../models/login';
import UserModel from '../models/user';
import db from '../database';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Check credentials
  if (!email || !password) {
    return res.status(400).json('Incorrect form submittion.');
  }

  const login = await LoginModel.findOne({ where: { email } });

  if (!login) res.status(400).json('Wrong credentials');
  // Check password
  const isValidPassword = await bcrypt.compare(password, login.hash);

  if (isValidPassword) {
    const user = await UserModel.findByPk(login.uid);
    return res.json(user);
  }

  return res.status(400).json('Wrong credentials');
};

export const register = async (req: Request, res: Response) => {
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

export default {
  login,
  register
};
