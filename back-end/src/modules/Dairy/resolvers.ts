import { Dairy } from '../../models/Dairy';
import { User } from '../../models/User';
import { getDateOnly, isToday } from '../../helpers/Dairy/dates';

export default {
  Mutation: {
    addDairySheet: async (_:any, {
      date, pressureUp, pressureDown, glucose, weight,
    }:any, { req, res }:any) => {
    // check user auth
      const user = await User.findOne({ _id: req.userId });
      if (!user || !user.user.email.verified) {
        throw new Error('Not today!');
      }

      const currentDate = new Date().toISOString();
      const allUserDairySheet = (await Dairy.find())
        .filter((el) => el.userId === req.userId && getDateOnly(el.date) === getDateOnly(date));

      if (allUserDairySheet.length >= 3) {
        throw new Error('You have max sheets today!');
      }

      await new Dairy({
        userId: req.userId,
        date,
        pressure: {
          up: pressureUp,
          down: pressureDown,
        },
        glucose,
        weight,
        createdAt: currentDate,
        updatedAt: currentDate,
      }).save();

      return 'Success!';
    },
  },

};
