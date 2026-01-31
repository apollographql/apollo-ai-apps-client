import { ApolloLink } from "@apollo/client";

export class ToolCallLink extends ApolloLink {
  constructor() {
    super();

    throw new Error(
      "Cannot construct a `ToolCallLink` from `@apollo/client-ai-apps` without export conditions. Please set export conditions or import from  the `/openai` or `/mcp` subpath directly."
    );
  }
}
