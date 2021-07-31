import UserModel from './userModel';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { promisify } from 'util';
import redisClient from '../../redis';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
const JWT_EXPIRE_TIME = 60 * 60 * 24 * 2;

const signToken = (id: number) => {
  const jwtPayload = { id };
  return jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: JWT_EXPIRE_TIME });
};

const setToken = async (token: string, id: number) => {
  const setAsync = promisify(redisClient.set).bind(redisClient);

  try {
    return await setAsync(token, String(id), 'EX', JWT_EXPIRE_TIME);
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyToken = async (token: string) => {
  let authToken = token.slice(0, token.length);
  if (!authToken.includes('Bearer ')) throw new Error('Invalid Token.');
  authToken = authToken.replace('Bearer ', '');
  const getAsync = promisify(redisClient.get).bind(redisClient);

  try {
    const isValid = await getAsync(authToken);
    if (!isValid) throw new Error('Unauthorized');

    const decoded = jwt.verify(authToken, JWT_SECRET);
    if (typeof decoded === 'object') {
      return decoded.id;
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const createAuthToken = async (user: UserModel) => {
  // JWT token, return user data
  const { id } = user;
  const token = signToken(id);

  try {
    await setToken(token, id);
    return { token, type: 'Bearer' };
  } catch (error) {
    console.log('Token fail to sign: ', error);
    return { token: null, type: 'Bearer' };
  }
};
