import { ApolloClient, InMemoryCache } from "@apollo/client";

const endPointURL = "http://localhost:4000/graphql";
const client = new ApolloClient({
  uri: endPointURL,
  cache: new InMemoryCache(),
})

export default client
