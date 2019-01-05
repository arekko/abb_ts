import { Platform } from "react-native";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";

// android
const host =
  Platform.OS === "ios" ? "http://localhost:4000" : "http://192.168.1.230:4000";

// ios localhost

console.log("here");
export const client = new ApolloClient({
  link: createUploadLink({
    uri: host
  }),
  cache: new InMemoryCache()
});
