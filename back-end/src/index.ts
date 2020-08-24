import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import colors from 'colors';
import { User } from './models/User';
import createTokens from './helpers/auth';
import { dateAccess, dateRefresh } from './helpers/tokensLife';

import { UserModule } from './modules/User';
import { AuthModule } from './modules/Auth';
import { DairyModule } from './modules/Dairy';

require('dotenv').config();

colors.enable();

const startServer = async () => {
  const server = new ApolloServer({
    modules: [UserModule, AuthModule, DairyModule],
    context: ({ req, res }: any) => ({ req, res }),
  });

  const app = express();
  app.use(cors());
  app.use(cookieParser());

  app.use(async (req: any, res: any, next) => {
    const refreshToken = req.cookies['refresh-token'];
    const accessToken = req.cookies['access-token'];

    if (!refreshToken && !accessToken) {
      return next();
    }

    try {
      const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as any;
      req.userId = data.userId;
      return next();
    } catch (e) { }

    if (!refreshToken) {
      return next();
    }

    let data;
    try {
      data = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as any;
    } catch (e) {
      return next();
    }

    const user = await User.findOne({ _id: data.userId });
    if (!user || user.count !== data.count) {
      return next();
    }

    const tokens = createTokens(user);

    res.cookie('refresh-token', tokens.refreshToken, { expires: dateRefresh, secure: true });
    res.cookie('access-token', tokens.accessToken, { expires: dateAccess, secure: true });
    req.userId = user.id;
    next();
  });

  server.applyMiddleware({ app });

  await mongoose.connect(`mongodb://${process.env.DB_ADDR}:${process.env.DB_PORT}/`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  });

  console.log(' 🕊  Connected to mongo database', `${process.env.DB_NAME}`.magenta);

<<<<<<< HEAD
  const portBack: number = Number(process.env.PORT || 8000);
  app.listen(portBack, () => {
    console.log(' 🦄 Server started at', `http://${process.env.URL || 'localhost'}:${portBack}${server.graphqlPath}`.magenta);
=======
  const port: number = Number(process.env.PORT);
  app.listen({ port }, () => {
    console.log(' 🦄 Server started at', `http://localhost:${port}${server.graphqlPath}`.magenta);
>>>>>>> parent of 8889d13... add config, change paths for reqs
  });
};

startServer();
