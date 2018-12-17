import { HttpLink } from "apollo-link-http";
import { Platform } from "react-native";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

// android
const host = Platform.OS === "ios" ? "http://localhost:4000" : "http://192.168.1.230:4000";

// ios localhost

export const client = new ApolloClient({
  link: new HttpLink({
    uri: host 
  }),
  cache: new InMemoryCache()
});
