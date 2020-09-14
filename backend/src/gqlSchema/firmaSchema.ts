import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} from 'graphql';
import { ApType } from './apSchema';

import { Firma } from '../models/firma';

const FirmaType = new GraphQLObjectType({
  name: 'Firma',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    stadt: { type: GraphQLString },
    plz: { type: GraphQLString },
    ap: { type: new GraphQLList(ApType) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    firma: {
      type: new GraphQLList(FirmaType),
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        stadt: { type: GraphQLString },
        plz: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const res = await Firma.find(args);
        return res;
      },
    },
    distinct: {
      type: new GraphQLList(GraphQLString),
      args: {
        field: { type: GraphQLString },
        title: { type: GraphQLString },
        stadt: { type: GraphQLString },
        plz: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const { field } = args;
        if (!field) throw new Error('field is required');
        delete args.field;

        return await Firma.distinct(field, args);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export { schema as firmaSchema };
