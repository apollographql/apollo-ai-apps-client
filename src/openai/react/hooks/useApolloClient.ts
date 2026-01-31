import type { ApolloClient as BaseApolloClient } from "@apollo/client";
import { useApolloClient as useBaseApolloClient } from "@apollo/client/react";
import type { ApolloClient } from "../../core/ApolloClient";

/** @internal */
export function useApolloClient(override?: ApolloClient) {
  const client = useBaseApolloClient(override);

  ensureCorrectClient(client);

  return client;
}

function ensureCorrectClient(
  client: BaseApolloClient | ApolloClient
): asserts client is ApolloClient {
  if (!("manifest" in client)) {
    throw new Error(
      'The "client" instance provided to <ApolloProvider /> is the wrong type. You might have imported from `@apollo/client`. Please import `ApolloClient` from `@apollo/client-ai-apps` instead.'
    );
  }
}
