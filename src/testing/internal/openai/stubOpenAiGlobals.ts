import { vi } from "vitest";
import type {
  API,
  OpenAiGlobals,
  UnknownObject,
} from "../../../openai/types.js";
import "../../../openai/globals.js";
import { dispatchStateChange } from "./dispatchStateChange.js";

export function stubOpenAiGlobals(globals?: Partial<API<any> & OpenAiGlobals>) {
  vi.stubGlobal("openai", {
    setWidgetState: (state: UnknownObject) => {
      window.openai.widgetState = state;
      dispatchStateChange();
    },
    // Using a `null` here instead of `undefined` allows for the client to fully
    // initialize without having to wait for the global openAI event.
    toolOutput: null,
    ...globals,
  });
}
