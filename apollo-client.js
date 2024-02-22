// apollo-client.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const authLink = setContext((_, { headers }) => {
//   // Get the authentication token from wherever it's stored
//   const token = 'YOUR_AUTH_TOKEN'; // Replace with actual logic to retrieve token

//   // Return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: 'http://3.86.80.67/graphql',
//   }),
//   cache: new InMemoryCache(),
// });

// export default client;

import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "https://api.interlade.com/graphql",
});
// http://3.86.80.67
// const authLink = setContext((_, { headers }) => {
//   // Get the authentication token from wherever it's stored
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjciLCJuYW1lIjoiQmFzaGkgUm9uIFNtaXRoIiwiZW1haWwiOiJmdWlya2FzaGlAZ21haWwuY29tIiwicm9sZSI6IjEiLCJpYXQiOjE3MDQ3MjUxOTcsImV4cCI6MTcwNDgxMTU5N30.xC8ZCy18A10AUvt5TdZ9yJNNtz7oleFgID4RyONBG_8';
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `${token}` : "",
//     }
//   }
// });
const authLink = setContext((_, { headers }) => {
  // Retrieve the authentication token from local storage
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
