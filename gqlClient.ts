import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { persistCache } from 'apollo-cache-persist';
// import localforage from 'localforage';

export const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_FAUNA_DOMAIN,
});

const authLink = setContext((_, { headers }) => { 
  const faunaKey = process.env.NEXT_PUBLIC_FAUNA_KEY;
  return {
    headers: { 
      ...headers,
      authorization: `Bearer ${faunaKey}`,
    }
  }
});

export const setAuthToken = (token: string) => setContext((_,
  { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    }
}))

const isServer = typeof window === 'undefined';
export const client = new ApolloClient({
  // ssrMode: isServer,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// export const createApolloClient = async () => {
//   const isServer = typeof window === 'undefined';

//   const cache = new InMemoryCache();

//   // Persist the cache
//   if (!isServer) {
//     await persistCache({
//       cache,
//       storage: localforage as any, // Cast localforage to any to avoid TypeScript error
//     });
//   }

//   const client = new ApolloClient({
//     ssrMode: isServer,
//     link: authLink.concat(httpLink),
//     cache,
//   });

//   return client;
// };

// export const client = createApolloClient();