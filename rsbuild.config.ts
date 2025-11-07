import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";

const { publicVars, rawPublicVars } = loadEnv({ prefixes: ["REACT_APP_"] });

export default defineConfig({
  html: {
    template: "./public/index.html",
  },
  output: {
    distPath: {
      root: "build",
    },
  },
  plugins: [
    pluginNodePolyfill(),
    pluginReact(),
    pluginSvgr({ mixedImport: true }),
  ],
  source: {
    define: {
      ...publicVars,
      "process.env": JSON.stringify(rawPublicVars),
    },
    // Compile all JS files and exclude core-js
    include: [{ not: /[\\/]core-js[\\/]/ }],
  },
});
