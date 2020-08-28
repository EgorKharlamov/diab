import { User } from '../../models/User';
import { randInt } from '../../helpers/math';

export default {

  Query: {
    hello: () => 'Hi there!',
    me: async (_: any, __: any, { req }: any) => {
      if (!req.userId) {
        throw new Error('Guest');
      }
      const user = await User.findOne({ _id: req.userId });
      if (user) {
        user.login.pass = '*'.repeat(randInt(1, 40));
        return user;
      }
      throw new Error('Something wrong...');
    },
    users: () => User.find().map((el) => el.map((each) => each.login.login)),
  },
};
