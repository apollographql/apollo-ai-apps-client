import * as esbuild from "esbuild";
import { sharedConfig } from "./shared.mjs";

console.log("Starting dev mode...");

let ctx = await esbuild.context({
  ...sharedConfig,
  plugins: [
    {
      name: "rebuild-logger",
      setup(build) {
        build.onEnd((result) => {
          console.log(`Rebuilt at ${new Date().toLocaleTimeString()} (${result.errors.length} errors)`);
        });
      },
    },
  ],
});

console.log("Watching for changes...");
await ctx.watch();
