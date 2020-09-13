import { GraphQLObjectType, GraphQLString } from 'graphql';

const ApType = new GraphQLObjectType({
  name: 'Ap',
  fields: () => ({
    vorname: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

export { ApType };
