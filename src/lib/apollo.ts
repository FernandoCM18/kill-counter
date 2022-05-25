import { ApolloClient, InMemoryCache, HttpLink, split, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from '../constants';
import { removeToken } from '../utils/token';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );

        if ( message.includes('Context creation failed')) {
          removeToken();
          window.location.reload();
        }
    }
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_URL_SERVER,
  fetchOptions: {
    credentials: 'include',
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    } 
  } else {
    return {
      headers
    }
  }
});

const authedHttpLink = authLink.concat(httpLink);

const wsLink = new GraphQLWsLink(createClient({
  url: import.meta.env.VITE_URL_SERVER_WS,
}));


const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
  },
  wsLink,
  authedHttpLink,
);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        kills: {
          keyArgs: ['idGroup'],
          merge(existing, incoming, { args: { skip = 0 }}) {
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; i++) {
              merged[skip + i] = incoming[i];
            }
            return merged;
          },
        }
      }
    }
  }
});

export const apollo = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache,
  connectToDevTools: true
});