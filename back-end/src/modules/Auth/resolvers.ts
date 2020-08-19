import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { User } from '../../models/User';
import createUserValidator from '../../helpers/validators/createUserValidator';
import createTokens from '../../auth';
import { dateAccess, dateRefresh } from '../../helpers/tokensLife';
import { MailToken } from '../../models/MailTokens';

export default {

  Mutation: {
    createUser: async (_:any, { login, pass, email }: any, { req }:any) => {
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

    authUser: async (_:any, { login, pass }:any, { req, res }:any) => {
      const user = await User.findOne({ 'login.login': login });

      // console.log(login, pass);
      if (!user) {
        throw new Error('Not today!');
      }

      const dehashPass = await bcrypt.compare(pass, user.login.pass);
      if (!dehashPass) {
        throw new Error('Not today!');
      }

      const { refreshToken, accessToken } = createTokens(user);

      res.cookie('refresh-token', refreshToken, { expires: dateRefresh, secure: true });
      res.cookie('access-token', accessToken, { expires: dateAccess, secure: true });

      return 'All right!';
    },

    invalidateTokens: async (_:any, __:any, { req, res }:any) => {
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

    createMailTokens: async (_:any, __:any, { req, res }:any) => {
      // console.log(req.userId);
      const user = await User.findOne({ _id: req.userId });
      if (!user) {
        throw new Error('No no no!');
      }
      const token = new MailToken({ userId: user.id, token: crypto.randomBytes(16).toString('hex') });
      // const targetMail = user.login.email.value;
      const targetMail = 'egorkharlamov9338@gmail.com';

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
        text: `Hi there! Its your verification code, be careful!\n${token.token}`,
      };

      await transporter.sendMail(mailOpt, async (err) => {
        if (err) {
          console.log(err);
          return 'error';
        }
        console.log('Success!');
        await token.save();
        return 'Success!';
      });

      return 'Check your mail!';
    },
  },
};
