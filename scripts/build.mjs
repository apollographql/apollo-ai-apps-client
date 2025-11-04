import * as esbuild from "esbuild";
import { sharedConfig } from "./shared.mjs";

await esbuild.build({
  ...sharedConfig,
});
