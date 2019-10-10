"use strict";

import defaultsDeep from "lodash.defaultsdeep";

function theme(componentName) {
    return {
        variants: theme.variants.bind(null, componentName),
    };
}

theme.variants = function(componentName, variantName, componentSheet) {
    return function(props) {
        const globalComponentSheet = props.theme[componentName];
        const stylesheet = defaultsDeep(componentSheet, globalComponentSheet); // which do we want to take precedence?

        const variantValue = props[variantName];

        const variantSheet = defaultsDeep(
            (variantValue && stylesheet[variantValue]) || {},
            stylesheet
        );

        return variantSheet;
    };
};

export default theme;
