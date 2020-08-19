import { GraphQLModule } from '@graphql-modules/core';
import resolvers from './resolvers';
import 'graphql-import-node';
import * as typeDefs from './auth.graphql';

export const AuthModule = new GraphQLModule({
  typeDefs,
  resolvers,
  context: ({ req, res }: any) => ({ req, res }),
});
