"use strict";

import defaultsDeep from "lodash.defaultsdeep";

function _isObject(value) {
    return value != null && typeof value === "object";
}

function _isFunction(value) {
    return value != null && typeof value === "function";
}

function _isPseudoClass(value) {
    return value.includes(":");
}

function theme(componentName) {
    return {
        variant: variant.bind(null, componentName),
    };
}

function variant(componentName, variantName, variantStylesheet = {}) {
    return function(props) {
        const globalComponentStylesheet = props.theme[componentName] || {};

        const stylesheet = defaultsDeep(
            { ...variantStylesheet },
            globalComponentStylesheet
        ); // ? Local takes precedence over global because of highher specificity

        const variantPropValue = props[variantName];
        const stylesheetVariant =
            (variantPropValue && stylesheet[variantPropValue]) || {};

        let variantSheet = defaultsDeep({ ...stylesheetVariant }, stylesheet);

        for (let [key, value] of Object.entries(variantSheet)) {
            if (_isObject(value) && !_isPseudoClass(key)) {
                // ? Adds support for boolean variants ontop of normal variant
                if (!!props[key] && variantSheet[key]) {
                    variantSheet = { ...variantSheet, ...variantSheet[key] };
                }

                // ? Removes excess key/values that do not apply to reduce the number of styles created by styled-components
                delete variantSheet[key];
            }
        }

        for (let [key, value] of Object.entries(variantSheet)) {
            if (_isFunction(value)) {
                variantSheet[key] = value(props);
            } else if (_isPseudoClass(key)) {
                // ? Support pseudo-class functions
                let newPseudoValues = {};

                for (let [pseudoKey, pseudoValue] of Object.entries(
                    variantSheet[key]
                )) {
                    newPseudoValues[pseudoKey] = _isFunction(pseudoValue)
                        ? pseudoValue(props)
                        : pseudoValue;
                }

                variantSheet[key] = newPseudoValues;
            }
        }

        return variantSheet;
    };
}

export default theme;
