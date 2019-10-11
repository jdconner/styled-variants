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

function variant(componentName, variantName, variantStylesheet) {
    return function(props) {
        const globalComponentStylesheet = props.theme[componentName] || {};
        const stylesheet = defaultsDeep(globalComponentStylesheet, variantStylesheet); // Global takes precedence over local

        const variantPropValue = props[variantName];

        const variantSheet = defaultsDeep(
            (variantPropValue && stylesheet[variantPropValue]) || {},
            stylesheet
        );

        for (let [key, value] of Object.entries(variantSheet)) {
            // ? Removes excess key/values that do not apply to reduce the number of styles created by styled-components
            if (_isObject(value)) delete variantSheet[key];
            if (_isFunction(value)) variantSheet[key] = value(props);
        }

        return variantSheet;
    };
}

export default theme;
