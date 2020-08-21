import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { User } from '../../models/User';
import createUserValidator from '../../validators/createUserValidator';
import createTokens from '../../helpers/auth';
import { dateAccess, dateRefresh, isMailTokenAlive } from '../../helpers/tokensLife';
import { MailToken } from '../../models/MailTokens';

export default {

  Mutation: {
    createUser: async (_: any, { login, pass, email }: any, { req }: any) => {
      const validator = createUserValidator.validate({ login, pass, email });

      const userLogin = await User.findOne({ 'login.login': login });
      const userEmail = await User.findOne({ 'login.email.value': email });

      if (validator.error) {
        return validator.error?.details[0].message;
      }

      if (userLogin || userEmail) {
        throw new Error('User already exists!');
      }

      const hashPass = await bcrypt.hash(pass, 10);
      const date = new Date().toISOString();
      await new User({
        login: {
          login,
          pass: hashPass,
          email: {
            value: email,
          },
        },
        createdAt: date,
        updatedAt: date,
      }).save();
      return 'Success!';
    },

    authUser: async (_: any, { login, pass }: any, { req, res }: any) => {
      const user = await User.findOne({ 'login.login': login });

      if (!user) {
        throw new Error('Not today!');
      }

      const dehashPass = await bcrypt.compare(pass, user.login.pass);
      if (!dehashPass) {
        throw new Error('Not today!');
      }

      const { refreshToken, accessToken } = createTokens(user);

      res.cookie('refresh-token', refreshToken, { expires: dateRefresh });
      res.cookie('access-token', accessToken, { expires: dateAccess });

      return 'All right!';
    },

    invalidateTokens: async (_: any, __: any, { req, res }: any) => {
      if (!req.userId) {
        return false;
      }

      const user = await User.findOne({ _id: req.userId });
      if (!user) {
        return false;
      }
      user.count += 1;
      user.updatedAt = new Date().toISOString();
      await user.save();

      res.clearCookie('access-token');
      res.clearCookie('refresh-token');

      return true;
    },

    createMailTokens: async (_: any, __: any, { req, res }: any) => {
      const user = await User.findOne({ _id: req.userId });
      if (!user || user.login.email.verified) {
        throw new Error('No no no!');
      }
      const token = new MailToken({ userId: user.id, token: crypto.randomBytes(16).toString('hex') });
      const targetMail = user.login.email.value;

      const existToken = await MailToken.findOne({ userId: req.userId });
      if (existToken && isMailTokenAlive(existToken.createdAt)) {
        return 'Your previous token is alive! Check your email again!';
      }

      if (existToken) {
        await MailToken.findByIdAndUpdate(
          existToken.id,
          { token: token.token, createdAt: new Date().toISOString() },
        );
      } else {
        await token.save();
      }

      const transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE_NAME,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const mailOpt = {
        from: process.env.MAIL_USER,
        to: targetMail,
        subject: 'Account verification',
        text: `Hi there! Its your verification code, be careful!\n${token.token}\nYou have 5 minutes!`,
      };

      await transporter.sendMail(mailOpt, async (err) => {
        if (err) {
          return 'error';
        }
        return 'Success!';
      });

      return 'Check your mail!';
    },

    verifyByMail: async (_: any, { token }: any, { req, res }: any) => {
      const user = await User.findOne({ _id: req.userId });
      if (!user || !token) {
        throw new Error('No no no!');
      }
      const existToken = await MailToken.findOne({ userId: req.userId });
      if (existToken && isMailTokenAlive(existToken.createdAt)) {
        await User.findByIdAndUpdate(
          { _id: req.userId },
          { 'login.email.verified': true },
        );
        await MailToken.findOneAndDelete({ userId: req.userId });
        return 'Successful verifying!';
      }
      return 'Something wrong... Hmmm....';
    },
  },
};
