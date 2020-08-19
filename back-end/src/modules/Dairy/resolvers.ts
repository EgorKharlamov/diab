import { Dairy } from '../../models/Dairy';
import { User } from '../../models/User';

export default {
  Mutation: {
    addDairySheet: async (_:any, {
      date, time, pressureUp, pressureDown, glucose, weight,
    }:any, { req, res }:any) => {
    // check user auth
      const user = await User.findOne({ _id: req.userId });
      if (!user) {
        return 'Not today!';
      }

      console.log(user);
      return 'Success!';
    },
  },

};
