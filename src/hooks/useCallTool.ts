import { useState, useEffect, useCallback } from "react";

type UseCallToolResult = <K>(toolId: string, variables: Record<string, unknown>) => Promise<K>;

export const useCallTool = (): UseCallToolResult => {
  const callTool = async (toolId: string, variables: Record<string, unknown> = {}) =>
    await window.openai?.callTool(toolId, variables);

  return callTool;
};
