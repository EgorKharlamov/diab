import { GraphQLModule } from '@graphql-modules/core';
import resolvers from './resolvers';
import 'graphql-import-node';
import * as typeDefs from './dairy.graphql';

export const DairyModule = new GraphQLModule({
  typeDefs,
  resolvers,
  context: ({ req, res }: any) => ({ req, res }),
});
