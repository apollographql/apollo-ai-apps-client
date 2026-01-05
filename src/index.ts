export type {
  API,
  CallTool,
  DeviceType,
  DisplayMode,
  OpenAiGlobals,
  SafeArea,
  SafeAreaInsets,
  Theme,
  UserAgent,
  UnknownObject,
} from "./types/openai";
export { SET_GLOBALS_EVENT_TYPE, SetGlobalsEvent } from "./types/openai";

export type {
  ApplicationManifest,
  ManifestOperation,
  ManifestTool,
  ManifestExtraInput,
  ManifestCsp,
} from "./types/application-manifest";

export { ToolUseProvider } from "./react/context/ToolUseContext";
export { useOpenAiGlobal } from "./react/hooks/useOpenAiGlobal";
export { useToolName } from "./react/hooks/useToolName";
export { useToolInput } from "./react/hooks/useToolInput";
export { useSendFollowUpMessage } from "./react/hooks/useSendFollowUpMessage";
export { useRequestDisplayMode } from "./react/hooks/useRequestDisplayMode";
export { useToolEffect } from "./react/hooks/useToolEffect";
export { useOpenExternal } from "./react/hooks/useOpenExternal";
export { useToolOutput } from "./react/hooks/useToolOutput";
export { useToolResponseMetadata } from "./react/hooks/useToolResponseMetadata";
export { useWidgetState } from "./react/hooks/useWidgetState";

export * from "@apollo/client";
export { ApolloClient } from "./core/ApolloClient";
export { ApolloProvider } from "./react/ApolloProvider";
export { ToolCallLink } from "./link/ToolCallLink";
