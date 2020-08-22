import nodemailer from 'nodemailer';
import { passRecoveryLifeTimeMin, verificationTokenLifeTimeMin } from '../helpers/tokensLife';

export class Mailer {
    transportOpt: object;

    mailOpt: object;

    constructor(targetMail:string) {
      this.transportOpt = {
        service: process.env.MAIL_SERVICE_NAME,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      };

      this.mailOpt = {
        from: process.env.MAIL_USER,
        to: targetMail,
      };
    }

    async sendVerification(token:string) {
      const transporter = nodemailer.createTransport(this.transportOpt);

      const mailOpt = {
        ...this.mailOpt,
        subject: 'Account verification',
        text: `Hi there! Its your verification code, be careful!\n${token}\nYou have ${verificationTokenLifeTimeMin} min!`,
      };

      await transporter.sendMail(mailOpt, async (err) => {
        if (err) {
          return 'error';
        }
        return 'Success!';
      });
    }

    async sendRecoveryPass(pass:string) {
      const transporter = nodemailer.createTransport(this.transportOpt);

      const mailOpt = {
        ...this.mailOpt,
        subject: 'Password recovery',
        text: `Hi there! Its your new password, be careful!\n${pass}\nYou have ${passRecoveryLifeTimeMin} min!`,
      };

      await transporter.sendMail(mailOpt, async (err) => {
        if (err) {
          return 'error';
        }
        return 'Success!';
      });
    }
}
