import { afterEach, expect, test, vi } from "vitest";
import { stubOpenAiGlobals } from "../testing/internal";
import { renderHookToSnapshotStream } from "@testing-library/react-render-stream";
import { useToolOutput } from "./useToolOutput";
import { SET_GLOBALS_EVENT_TYPE } from "../types/openai";

afterEach(() => {
  vi.unstubAllGlobals();
});

test("returns the tool output set in window", async () => {
  stubOpenAiGlobals({ toolOutput: { test: true } });

  const { takeSnapshot } = await renderHookToSnapshotStream(() =>
    useToolOutput()
  );

  await expect(takeSnapshot()).resolves.toEqual({ test: true });
  await expect(takeSnapshot).not.toRerender();
});

test("returns null when not set", async () => {
  stubOpenAiGlobals();

  const { takeSnapshot } = await renderHookToSnapshotStream(() =>
    useToolOutput()
  );

  await expect(takeSnapshot()).resolves.toBeNull();
  await expect(takeSnapshot).not.toRerender();
});

test("reacts to changes in globals", async () => {
  stubOpenAiGlobals({ toolOutput: { initial: true } });

  const { takeSnapshot } = await renderHookToSnapshotStream(() =>
    useToolOutput()
  );

  await expect(takeSnapshot()).resolves.toEqual({ initial: true });

  window.openai.toolOutput = { updated: true };
  window.dispatchEvent(
    new CustomEvent(SET_GLOBALS_EVENT_TYPE, {
      detail: { globals: window.openai },
    })
  );

  await expect(takeSnapshot()).resolves.toEqual({ updated: true });
  await expect(takeSnapshot).not.toRerender();
});
