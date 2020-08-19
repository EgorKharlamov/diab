import { User } from '../../models/User';

export default {

  Query: {
    hello: () => 'Hi there!',
    me: (_:any, __:any, { req }:any) => {
      if (!req.userId) {
        throw new Error('Hi, guest!');
      }
      return User.findOne({ _id: req.userId });
    },
    users: () => User.find().map((el) => el.map((each) => each.login.login)),
  },
};
