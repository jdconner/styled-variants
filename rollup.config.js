import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
// import typescript from "rollup-plugin-typescript"; // remove comment once we support TS types
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const plugins = [
    // typescript(), // remove comment once we support TS types
    resolve(), // so Rollup can find deps
    commonjs({ extensions: [".js", ".ts", ".tsx"] }), // so Rollup can convert deps to an ES module
    terser(),
];

export default [
    // CommonJS (for Node), ES module (for bundlers), UMD for (for browsers) build.
    {
        input: "src/index.js",
        output: [
            { file: pkg.module, format: "es" },
            { file: pkg.main, format: "cjs" },
            {
                name: "styled-variants",
                file: pkg.browser, // Doesnt exist yet?
                format: "umd",
            },
        ],
        plugins,
    },
];
