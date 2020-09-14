import { ApolloClient, InMemoryCache } from '@apollo/client';

export default new ApolloClient({
  uri: 'http://localhost/graphql',
  cache: new InMemoryCache(),
});
