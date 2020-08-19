import { sign } from 'jsonwebtoken';
import { iUser } from '../models/User';

require('dotenv').config();

export default (user: iUser) => {
  const refreshToken = sign({ userId: user.id, count: user.count }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });
  const accessToken = sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '120min' });
  return { refreshToken, accessToken };
};
