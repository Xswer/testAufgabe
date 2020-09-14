import { GraphQLObjectType, GraphQLString } from 'graphql';

const ApType = new GraphQLObjectType({
  name: 'Ap',
  fields: () => ({
    vorname: { type: GraphQLString },
    nachname: { type: GraphQLString },
  }),
});

export { ApType };
