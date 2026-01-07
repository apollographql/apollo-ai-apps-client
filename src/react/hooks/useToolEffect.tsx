import React, { useEffect } from "react";
import { useToolName } from "./useToolName";
import { useToolInput } from "./useToolInput";
import { useToolUseState } from "../context/ToolUseContext";

export const useToolEffect = (
  toolName: string | string[],
  effect: (toolInput: any) => void,
  deps: React.DependencyList = []
) => {
  const ctx = useToolUseState();
  const fullToolName = useToolName();
  const toolInput = useToolInput();
  if (!ctx)
    throw new Error("useToolEffect must be used within ToolUseProvider");

  const toolNames = Array.isArray(toolName) ? toolName : [toolName];

  useEffect(() => {
    const matches = toolNames.some(
      (name) => fullToolName === `${ctx.appName}--${name}`
    );

    if (!ctx.hasNavigated && matches) {
      effect(toolInput);
      ctx.setHasNavigated(true);
    }
  }, [
    ctx.hasNavigated,
    ctx.setHasNavigated,
    ctx.appName,
    toolNames,
    fullToolName,
    toolInput,
    ...deps,
  ]);
};
