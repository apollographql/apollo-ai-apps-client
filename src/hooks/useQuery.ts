import { useState, useEffect, useCallback } from "react";
import { useOpenAiGlobal } from "./useOpenAiGlobal";
import { useCallTool } from "./useCallTool";

type UseQueryResponse<K> = {
  loading: boolean;
  error: any;
  data: K | null;
  refresh: () => void;
};

export const useQuery = <K>(toolId: string, variables: Record<string, unknown>): UseQueryResponse<K> => {
  const toolOutput = useOpenAiGlobal("toolOutput");
  const callTool = useCallTool();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null); // TODO: Proper typing
  const [data, setData] = useState<K | null>(null); // TODO: Proper typing

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const result = await callTool<any>(toolId, variables);
      setData(result.data);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [toolId, variables]);

  useEffect(() => {
    if (toolOutput?.structuredContent?.[toolId] !== undefined) {
      setData(toolOutput?.structuredContent?.[toolId].data);
      setLoading(false);
    } else {
      refetch();
    }
  }, [toolOutput, toolId, refetch]);

  return { loading, error, data, refresh: refetch };
};
