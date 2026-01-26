import { expect, test, vi } from "vitest";
import { ApolloProvider } from "../ApolloProvider.js";
import { render } from "@testing-library/react";
import { ApolloClient } from "../../core/ApolloClient.js";
import { SET_GLOBALS_EVENT_TYPE } from "../../types.js";
import { InMemoryCache } from "@apollo/client";
import { mockApplicationManifest } from "../../../testing/internal/index.js";

test("Should call prefetch data when window.open is immediately available", () => {
  vi.stubGlobal("openai", {
    toolOutput: {},
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    manifest: mockApplicationManifest(),
  });

  vi.spyOn(client, "prefetchData");

  render(<ApolloProvider client={client} />);

  expect(client.prefetchData).toBeCalled();
});

test("Should NOT call prefetch data when window.open is not immediately available", () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    manifest: mockApplicationManifest(),
  });

  vi.spyOn(client, "prefetchData");

  render(<ApolloProvider client={client} />);

  expect(client.prefetchData).not.toBeCalled();
});

test("Should call prefetch data when window.open is not immediately available and event is sent", () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    manifest: mockApplicationManifest(),
  });

  vi.spyOn(client, "prefetchData");

  render(<ApolloProvider client={client} />);

  window.dispatchEvent(new CustomEvent(SET_GLOBALS_EVENT_TYPE));

  expect(client.prefetchData).toBeCalled();
});
