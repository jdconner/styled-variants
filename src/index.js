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

function parseForBooleanVariants(props, sheet) {
    let variantSheet = { ...sheet };
    for (let [key, value] of Object.entries(variantSheet)) {
        if (_isObject(value) && !_isPseudoClass(key)) {
            if (!!props[key] && variantSheet[key]) {
                variantSheet = {
                    ...variantSheet,
                    ...parseForBooleanVariants(props, variantSheet[key]),
                };
            }

            // ? Removes excess key/values that do not apply to reduce the number of styles created by styled-components
            delete variantSheet[key];
        }
    }

    return variantSheet;
}

function normalizeStylesheet(
    props,
    componentName,
    variantStylesheet,
    variantPropValue
) {
    const globalComponentStylesheet = props.theme[componentName] || {};
    const stylesheet = defaultsDeep(
        { ...variantStylesheet },
        globalComponentStylesheet
    ); // ? Local takes precedence over global because of higher specificity
    const stylesheetVariant =
        (variantPropValue && stylesheet[variantPropValue]) || {};
    let variantSheet = parseForBooleanVariants(
        props,
        defaultsDeep({ ...stylesheetVariant }, stylesheet)
    );

    for (let [key, value] of Object.entries(variantSheet)) {
        // ? Support passing of props to functions
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
}

function globalVariant(componentName, variantName, variantStylesheet = {}) {
    return function(props) {
        const variantPropValue = props.theme[variantName];
        return normalizeStylesheet(
            props,
            componentName,
            variantStylesheet,
            variantPropValue
        );
    };
}

function variant(componentName, variantName, variantStylesheet = {}) {
    return function(props) {
        const variantPropValue = props[variantName];
        return normalizeStylesheet(
            props,
            componentName,
            variantStylesheet,
            variantPropValue
        );
    };
}

function theme(componentName) {
    return {
        variant: variant.bind(null, componentName),
        globalVariant: globalVariant.bind(null, componentName),
    };
}

export default theme;
