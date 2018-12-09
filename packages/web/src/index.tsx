import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { ApolloProvider } from "react-apollo";
import Routes from "./routes";
import { client } from './apollo';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
