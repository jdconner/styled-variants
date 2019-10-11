"use strict";

import defaultsDeep from "lodash.defaultsdeep";

function _isObject(value) {
    return value != null && typeof value === "object";
}

function _isFunction(value) {
    return value != null && typeof value === "function";
}

function theme(componentName) {
    return {
        variant: variant.bind(null, componentName),
    };
}

function variant(componentName, variantName, variantStylesheet = {}) {
    return function(props) {
        const variantStylesheetCopy = Object.assign({}, variantStylesheet);
        const globalComponentStylesheet = props.theme[componentName] || {};

        const stylesheet = defaultsDeep(
            variantStylesheetCopy,
            globalComponentStylesheet
        ); // ? Local takes precedence over global

        const variantPropValue = props[variantName];

        let variantSheet = defaultsDeep(
            stylesheet,
            (variantPropValue && stylesheet[variantPropValue]) || {}
        );

        for (let [key, value] of Object.entries(variantSheet)) {
            if (_isObject(value)) {
                // ? Adds support for boolean variants ontop of normal variant
                if (!!props[key] && variantSheet[key]) {
                    variantSheet = { ...variantSheet, ...variantSheet[key] };
                }

                // ? Removes excess key/values that do not apply to reduce the number of styles created by styled-components
                delete variantSheet[key];
            }
        }

        for (let [key, value] of Object.entries(variantSheet)) {
            if (_isFunction(value)) variantSheet[key] = value(props);
        }

        return variantSheet;
    };
}

export default theme;
