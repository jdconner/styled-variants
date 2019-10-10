import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const plugins = [
	// typescript(), // remove comment once we support TS types
	resolve(), // so Rollup can find deps
	commonjs({ extensions: [".js", ".ts", ".tsx"] }), // so Rollup can convert deps to an ES module
	terser(),
];

export default [
    // browser-friendly UMD build
    {
        input: "src/index.js",
        output: {
            name: "styled-variants",
            file: pkg.browser, // Doesnt exist yet?
            format: "umd",
        },
        plugins
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: "src/index.js",
        external: [],
        plugins,
        output: [
            { file: pkg.main, format: "cjs" },
            { file: pkg.module, format: "es" },
        ],
    },
];
