import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
const url = import.meta.env.VITE_GRAPHQL;
const client = new ApolloClient({
  link: new HttpLink({
    uri: url, // ✅ Your GraphQL endpoint
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

export default client;
