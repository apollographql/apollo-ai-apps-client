import { App, PostMessageTransport } from "@modelcontextprotocol/ext-apps";
import type { ApplicationManifest } from "../../types/application-manifest";

type State = Record<"toolResult" | "toolInput", unknown>;

export class McpApp {
  private app: App;
  private state: State = { toolResult: undefined, toolInput: undefined };
  private handlers = new Map<keyof State, Set<(...args: any[]) => any>>();

  constructor(manifest: ApplicationManifest) {
    // TODO: Determine how we want to provide this version long-term.
    this.app = new App({ name: manifest.name, version: "1.0.0" });
    this.registerListeners();

    this.callServerTool = this.app.callServerTool.bind(this.app);
  }

  get toolResult() {
    return this.state.toolResult;
  }

  get toolInput() {
    return this.state.toolInput;
  }

  connect() {
    try {
      return this.app.connect(
        new PostMessageTransport(window.parent, window.parent)
      );
    } catch (e) {
      const error = e instanceof Error ? e : new Error("Failed to connect");

      throw error;
    }
  }

  callServerTool: App["callServerTool"];

  onChange<Key extends keyof State>(name: Key, cb: App[`on${Lowercase<Key>}`]) {
    let listeners = this.handlers.get(name);

    if (!listeners) {
      this.handlers.set(name, (listeners = new Set()));
    }

    listeners.add(cb);

    return () => {
      listeners.delete(cb);
    };
  }

  private registerListeners() {
    this.app.ontoolresult = (params) => {
      this.set("toolResult", params);
    };

    this.app.ontoolinput = (params) => {
      this.set("toolInput", params);
    };
  }

  private set(key: keyof State, value: unknown) {
    this.state[key] = value;
    this.notify(key);
  }

  private notify(key: keyof State) {
    this.handlers.get(key)?.forEach((listener) => listener(this.state[key]));
  }
}
