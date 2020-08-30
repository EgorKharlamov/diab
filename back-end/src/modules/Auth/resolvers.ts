import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { eUserRoles, iUser, User } from '../../models/User';
import createUserValidator from '../../validators/createUserValidator';
import createTokens from '../../helpers/auth';
import {
  dateAccess, dateRefresh, isMailTokenAlive, isPassRecoveryAlive,
} from '../../helpers/tokensLife';
import { MailToken } from '../../models/MailTokens';
import { PassRecovery } from '../../models/PassRecovery';
import { Mailer } from '../../services/mail';

export default {

  Mutation: {
    createUser: async (_: any, { login, pass, email }: any, { req }: any) => {
      const validator = createUserValidator.validate({ login, pass, email });

      const userLogin = await User.findOne({ 'user.login.value': login.toLowerCase() });
      const userEmail = await User.findOne({ 'user.email.value': email.toLowerCase() });

      if (validator.error) {
        throw new Error(validator.error?.details[0].message);
      }

      if (userLogin || userEmail) {
        throw new Error('User already exists!');
      }

      const hashPass = await bcrypt.hash(pass, 10);
      const date = new Date().toISOString();
      await new User({
        user: {
          login: {
            value: login.toLowerCase(),
            valueShowed: login,
          },
          pass: hashPass,
          email: {
            value: email.toLowerCase(),
            valueShowed: email,
          },
          role: eUserRoles.user,
        },
        createdAt: date,
        updatedAt: date,
      }).save();
      return 'Success!';
    },

    authUser: async (_: any, { entry, pass }: any, { req, res }: any) => {
      const isLoggedIn = await User.findOne({ _id: req.userId });
      if (isLoggedIn) {
        throw new Error('You\'re already logged in!');
      }

      let user: iUser | null;
      user = await User.findOne({ 'user.login.value': entry.toLowerCase() });
      if (!user) user = await User.findOne({ 'user.email.value': entry.toLowerCase() });
      if (!user) user = await User.findOne({ 'user.phone.value': entry });
      if (!user) {
        throw new Error('Not today!');
      }

      const userRecovery = await PassRecovery.findOne({ userId: user.id });
      if (!userRecovery) {
        const dehashPass = await bcrypt.compare(pass, user.user.pass);
        if (!dehashPass) {
          throw new Error('Not today!');
        }
      } else {
        const hashPass = await bcrypt.hash(pass, 10);
        await User.findByIdAndUpdate(userRecovery.userId, { 'user.pass': hashPass });
        await PassRecovery.findByIdAndDelete(userRecovery.id);
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
      if (!user || user.user.email.verified) {
        throw new Error('No no no!');
      }
      const token = new MailToken({ userId: user.id, token: crypto.randomBytes(16).toString('hex') });
      const targetMail = user.user.email.value;

      const existToken = await MailToken.findOne({ userId: req.userId });
      if (existToken && isMailTokenAlive(existToken.createdAt)) {
        throw new Error('Your previous token is alive! Check your email again!');
      }

      if (existToken) {
        await MailToken.findByIdAndUpdate(
          existToken.id,
          { token: token.token, createdAt: new Date().toISOString() },
        );
      } else {
        await token.save();
      }

      const mailer = new Mailer(targetMail);
      await mailer.sendVerification(token.token);

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
          { 'user.email.verified': true },
        );
        await MailToken.findOneAndDelete({ userId: req.userId });
        return 'Successful verifying!';
      }
      throw new Error('Something wrong... Hmmm....');
    },

    passRecovery: async (_: any, { email }: any, __: any) => {
      const user = await User.findOne({ 'user.email.value': email.toLowerCase() });
      if (!user) {
        throw new Error('No no no!');
      }

      const isTempPassExistForUser = await PassRecovery.findOne({ email: email.toLowerCase() });
      const pass = crypto.randomBytes(4).toString('hex');
      if (isTempPassExistForUser && isPassRecoveryAlive(isTempPassExistForUser.updatedAt)) {
        throw new Error('Recovery pass alive yet! Please check email again!');
      }
      if (isTempPassExistForUser && !isPassRecoveryAlive(isTempPassExistForUser.updatedAt)) {
        await PassRecovery.findByIdAndUpdate(isTempPassExistForUser.id, {
          passRecovery: pass,
          updatedAt: new Date().toISOString(),
        });
      } else if (!isTempPassExistForUser) {
        const tempPass = new PassRecovery({ email: email.toLowerCase(), passRecovery: pass, userId: user.id });
        await tempPass.save();
      }

      const mailer = new Mailer(email.toLowerCase());
      await mailer.sendRecoveryPass(pass);
      return 'New pass waiting for you! Check email!';
    },
  },
};
