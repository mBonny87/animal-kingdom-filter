import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </FluentProvider>
  </React.StrictMode>
);
