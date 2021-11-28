import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
// https://communitybackend.herokuapp.com/graphql

const httpLink = createHttpLink({
  uri: "https://communitybackend.herokuapp.com/graphql",
  credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: "wss://communitybackend.herokuapp.com/graphql",
  options: {
    reconnect: true,
    timeout: 3000,
  },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("access-token");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { WebSocketLink } from "@apollo/client/link/ws";

// const headers = { "x-hasura-admin-secret": "wizardking" };

// export const client = new ApolloClient({
//   link: new WebSocketLink({
//     uri: "ws://localhost:4000/graphql",
//     options: {
//       reconnect: true,
//       lazy: true,
//       timeout: 3000,
//       // connectionParams: {
//       //   headers,
//       // },
//     },
//   }),
//   cache: new InMemoryCache(),
// });
