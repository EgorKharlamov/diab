import 'graphql-import-node';
import { GraphQLModule } from '@graphql-modules/core';
import resolvers from './resolvers';
import * as typeDefs from './user.graphql';

export const UserModule = new GraphQLModule({
  typeDefs,
  resolvers,
  context: ({ req, res }: any) => ({ req, res }),
});
